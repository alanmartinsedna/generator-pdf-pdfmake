export function generateCleanText(data, internalBody) {
    if (!data || typeof data !== 'string') {
        return [];
    }

    const output = Array.isArray(internalBody) ? internalBody : [];

    function parseHtml(html) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        sanitizeDocument(doc);

        return doc;
    }

    function sanitizeDocument(doc) {
        doc.querySelectorAll('script,style,iframe,object,embed,meta,link')
            .forEach(node => node.remove());

        doc.querySelectorAll('*').forEach(node => {
            const attrsToRemove = [];

            Array.from(node.attributes).forEach(attr => {
                const attrName = attr.name.toLowerCase();
                if (attrName.startsWith('on')) {
                    attrsToRemove.push(attr.name);
                }
            });

            attrsToRemove.forEach(attrName => node.removeAttribute(attrName));
        });
    }

    function normalizeWhitespace(text) {
        return text
            .replace(/\u00a0/g, ' ')
            .replace(/[ \t]+/g, ' ');
    }

    function removeLeadingIcons(text) {
        return text.replace(/^\s*[>»]?\s*[✔✅☑]\s*/g, '');
    }

    function cleanInlineText(text) {
        if (!text) {
            return '';
        }

        return text
            .replace(/&nbsp;/g, ' ')
            .replace(/\r/g, '')
            .replace(/\n/g, ' ')
            .replace(/\t/g, ' ')
            .replace(/[✔✅☑]/g, '')
            .replace(/\s+/g, ' ');
    }

    function dedupeStyles(styles) {
        return Array.from(new Set(styles));
    }

    function buildPdfmakeNode(baseStyles, run) {
        const styles = dedupeStyles([...(baseStyles || []), ...(run.styles || [])]);
        const node = {
            text: run.text,
            style: styles
        };

        if (run.link) {
            node.link = run.link;
        }

        return node;
    }

    function parseInline(node, activeStyles = [], activeLink = null) {
        if (!node) {
            return [];
        }

        if (node.nodeType === Node.TEXT_NODE) {
            const text = cleanInlineText(node.nodeValue);
            if (!text || text.trim().length === 0) {
                return [];
            }

            return [{
                text,
                styles: activeStyles,
                link: activeLink
            }];
        }

        if (node.nodeType !== Node.ELEMENT_NODE) {
            return [];
        }

        const tagName = node.tagName.toLowerCase();
        if (tagName === 'br') {
            return [{
                text: '\n',
                styles: activeStyles,
                link: activeLink
            }];
        }

        const nextStyles = [...activeStyles];
        let nextLink = activeLink;

        if (tagName === 'strong' || tagName === 'b') {
            nextStyles.push('bold');
        } else if (tagName === 'em' || tagName === 'i') {
            nextStyles.push('italic');
        } else if (tagName === 'u') {
            nextStyles.push('underline');
        } else if (tagName === 's' || tagName === 'strike') {
            nextStyles.push('lineThrough');
        } else if (tagName === 'a' && node.getAttribute('href')) {
            nextLink = node.getAttribute('href');
        }

        const runs = [];
        node.childNodes.forEach(childNode => {
            runs.push(...parseInline(childNode, nextStyles, nextLink));
        });

        return runs;
    }

    function parseRunsFromElement(element) {
        const runs = [];
        element.childNodes.forEach(childNode => {
            runs.push(...parseInline(childNode, [], null));
        });
        return runs;
    }

    function collapseRuns(runs) {
        const collapsed = [];

        runs.forEach(run => {
            if (!run || !run.text) {
                return;
            }

            const cleanTextValue = normalizeWhitespace(run.text);
            if (!cleanTextValue || cleanTextValue.trim().length === 0) {
                return;
            }

            const normalizedRun = {
                ...run,
                text: cleanTextValue
            };

            const prev = collapsed[collapsed.length - 1];
            const prevStyles = JSON.stringify(prev?.styles || []);
            const currentStyles = JSON.stringify(normalizedRun.styles || []);
            const sameLink = (prev?.link || null) === (normalizedRun.link || null);

            if (prev && prevStyles === currentStyles && sameLink && prev.text !== '\n' && normalizedRun.text !== '\n') {
                prev.text += normalizedRun.text;
            } else {
                collapsed.push(normalizedRun);
            }
        });

        if (collapsed.length > 0) {
            collapsed[0].text = removeLeadingIcons(collapsed[0].text);
        }

        return collapsed.filter(run => run.text && run.text.trim().length > 0);
    }

    function createTextBlockFromRuns(runs, baseStyles) {
        const collapsedRuns = collapseRuns(runs);
        if (collapsedRuns.length === 0) {
            return null;
        }

        const text = collapsedRuns.map(run => buildPdfmakeNode(baseStyles, run));
        return { text };
    }

    function parseListItem(liNode, listStyleName) {
        const itemNodes = [];
        const listChildren = [];
        const itemRuns = [];

        liNode.childNodes.forEach(child => {
            if (
                child.nodeType === Node.ELEMENT_NODE &&
                (child.tagName.toLowerCase() === 'ul' || child.tagName.toLowerCase() === 'ol')
            ) {
                listChildren.push(child);
            } else {
                itemNodes.push(child);
            }
        });

        itemNodes.forEach(node => {
            itemRuns.push(...parseInline(node, [], null));
        });

        const textBlock = createTextBlockFromRuns(itemRuns, [listStyleName]);
        const nestedLists = listChildren
            .map(childList => parseList(childList))
            .filter(Boolean);

        if (textBlock && nestedLists.length === 0) {
            return textBlock;
        }

        if (!textBlock && nestedLists.length === 1) {
            return nestedLists[0];
        }

        if (!textBlock && nestedLists.length > 1) {
            return {
                stack: nestedLists,
                style: [listStyleName]
            };
        }

        if (textBlock && nestedLists.length > 0) {
            return {
                stack: [
                    textBlock,
                    ...nestedLists
                ],
                style: [listStyleName]
            };
        }

        return {
            text: '',
            style: [listStyleName]
        };
    }

    function parseList(listElement) {
        const tagName = listElement.tagName.toLowerCase();
        const listType = tagName === 'ol' ? 'ol' : 'ul';
        const listStyleName = listType === 'ol' ? 'orderedList' : 'unorderedList';
        const items = [];

        Array.from(listElement.children).forEach(child => {
            if (child.tagName.toLowerCase() !== 'li') {
                return;
            }

            const parsedItem = parseListItem(child, listStyleName);
            if (parsedItem) {
                items.push(parsedItem);
            }
        });

        if (items.length === 0) {
            return null;
        }

        return {
            [listType]: items,
            style: [listStyleName],
            markerColor: '#000000'
        };
    }

    function parseBlock(node, inheritedStyles = []) {
        if (!node || node.nodeType !== Node.ELEMENT_NODE) {
            return;
        }

        const tagName = node.tagName.toLowerCase();
        const headingMap = {
            h1: 'heading1',
            h2: 'heading2',
            h3: 'heading3',
            h4: 'heading4',
            h5: 'heading5',
            h6: 'heading6'
        };

        if (headingMap[tagName]) {
            const runs = parseRunsFromElement(node);
            const textBlock = createTextBlockFromRuns(runs, [headingMap[tagName]]);
            if (textBlock) {
                output.push([textBlock]);
            }
            return;
        }

        if (tagName === 'ul' || tagName === 'ol') {
            const listNode = parseList(node);
            if (listNode) {
                output.push([listNode]);
            }
            return;
        }

        if (tagName === 'blockquote') {
            const runs = parseRunsFromElement(node);
            const blockquoteStyles = [...inheritedStyles, 'bodyText', 'italic'];
            const textBlock = createTextBlockFromRuns(runs, blockquoteStyles);
            if (textBlock) {
                output.push([textBlock]);
            }
            return;
        }

        if (tagName === 'p' || tagName === 'div' || tagName === 'li') {
            const runs = parseRunsFromElement(node);
            const textBlock = createTextBlockFromRuns(runs, [...inheritedStyles, 'bodyText']);
            if (textBlock) {
                output.push([textBlock]);
            }

            Array.from(node.children).forEach(child => {
                const childTag = child.tagName.toLowerCase();
                if (childTag === 'ul' || childTag === 'ol') {
                    parseBlock(child, inheritedStyles);
                }
            });
            return;
        }

        const directBlockChildren = Array.from(node.children).filter(child => {
            const childTag = child.tagName.toLowerCase();
            return ['p', 'div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'blockquote', 'li'].includes(childTag);
        });

        if (directBlockChildren.length > 0) {
            directBlockChildren.forEach(child => parseBlock(child, inheritedStyles));
            return;
        }

        const fallbackRuns = parseRunsFromElement(node);
        const fallbackBlock = createTextBlockFromRuns(fallbackRuns, [...inheritedStyles, 'bodyText']);
        if (fallbackBlock) {
            output.push([fallbackBlock]);
        }
    }

    const doc = parseHtml(data);
    parseBlock(doc.body);

    return output;
}
