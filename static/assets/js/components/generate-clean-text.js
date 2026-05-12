export function generateCleanText(data, internalBody) {

    // =========================================
    // 🔒 VALIDAÇÃO
    // =========================================
    if (!data || typeof data !== 'string') {

        return [];
    }

    // =========================================
    // 📌 REMOVE QUEBRAS DESNECESSÁRIAS
    // =========================================
    let html = data
        .replace(/\n/g, '')
        .replace(/\r/g, '')
        .replace(/\t/g, '');

    // =========================================
    // 📌 CRIA PARSER HTML
    // =========================================
    const parser = new DOMParser();

    const doc = parser.parseFromString(
        html,
        'text/html'
    );

    // =========================================
    // 📌 FUNÇÃO PARA LIMPAR TEXTO
    // =========================================
    function cleanText(text) {

        if (!text) {
            return '';
        }

        return text
            .replace(/&nbsp;/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // =========================================
    // 📌 PROCESSA ESTILOS INLINE
    // =========================================
    function processInlineStyles(element) {

        const styles = ['bodyText'];

        // =====================================
        // BOLD
        // =====================================
        if (
            element.querySelector('strong') ||
            element.querySelector('b')
        ) {

            styles.push('bold');
        }

        // =====================================
        // ITALIC
        // =====================================
        if (
            element.querySelector('em') ||
            element.querySelector('i')
        ) {

            styles.push('italic');
        }

        // =====================================
        // UNDERLINE
        // =====================================
        if (
            element.querySelector('u')
        ) {

            styles.push('underline');
        }

        // =====================================
        // LINE THROUGH
        // =====================================
        if (
            element.querySelector('s') ||
            element.querySelector('strike')
        ) {

            styles.push('lineThrough');
        }

        return styles;
    }

    // =========================================
    // 📌 PROCESSA ELEMENTOS
    // =========================================
    function processElement(element) {

        // =====================================
        // TAG HTML
        // =====================================
        const tagName =
            element.tagName.toLowerCase();

        // =====================================
        // TEXTO LIMPO
        // =====================================
        const text =
            cleanText(element.textContent);

        // =====================================
        // IGNORA VAZIO
        // =====================================
        if (!text) {
            return;
        }

        // =====================================
        // H1
        // =====================================
        if (tagName === 'h1') {

            internalBody.push([{
                text,
                style: ['heading1']
            }]);

            return;
        }

        // =====================================
        // H2
        // =====================================
        if (tagName === 'h2') {

            internalBody.push([{
                text,
                style: ['heading2']
            }]);

            return;
        }

        // =====================================
        // H3
        // =====================================
        if (tagName === 'h3') {

            internalBody.push([{
                text,
                style: ['heading3']
            }]);

            return;
        }

        // =====================================
        // H4
        // =====================================
        if (tagName === 'h4') {

            internalBody.push([{
                text,
                style: ['heading4']
            }]);

            return;
        }

        // =====================================
        // H5
        // =====================================
        if (tagName === 'h5') {

            internalBody.push([{
                text,
                style: ['heading5']
            }]);

            return;
        }

        // =====================================
        // H6
        // =====================================
        if (tagName === 'h6') {

            internalBody.push([{
                text,
                style: ['heading6']
            }]);

            return;
        }

        // =====================================
        // UL
        // =====================================
        if (tagName === 'ul') {

            const items = [];

            element
                .querySelectorAll('li')
                .forEach(li => {

                    const itemText =
                        cleanText(li.textContent);

                    if (itemText) {

                        items.push(itemText);
                    }

                });

            if (items.length > 0) {

                internalBody.push([{
                    ul: items,
                    style: ['unorderedList'],
                    markerColor: '#000000'
                }]);
            }

            return;
        }

        // =====================================
        // OL
        // =====================================
        if (tagName === 'ol') {

            const items = [];

            element
                .querySelectorAll('li')
                .forEach(li => {

                    const itemText =
                        cleanText(li.textContent);

                    if (itemText) {

                        items.push(itemText);
                    }

                });

            if (items.length > 0) {

                internalBody.push([{
                    ol: items,
                    style: ['orderedList'],
                    markerColor: '#000000'
                }]);
            }

            return;
        }

        // =====================================
        // PARÁGRAFOS / DIV
        // =====================================
        if (
            tagName === 'p' ||
            tagName === 'div'
        ) {

            const styles =
                processInlineStyles(element);

            internalBody.push([{
                text,
                style: styles
            }]);

            return;
        }

    }

    // =========================================
    // 📌 PERCORRE ELEMENTOS
    // =========================================
    Array.from(doc.body.children)
        .forEach(element => {

            processElement(element);

        });

    // =========================================
    // 📦 RETORNO FINAL
    // =========================================

    return internalBody;
}