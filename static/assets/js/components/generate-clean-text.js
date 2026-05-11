export function generateCleanText(data) {

    console.log('[GENERATE-CLEAN-TEXT.JS] INÍCIO DA FUNÇÃO')
    // console.log('[GENERATE-CLEAN-TEXT.JS] tipo data = ',typeof data)
    // =========================================
    // 🔒 VALIDAÇÃO
    // =========================================
    if (!data || typeof data !== 'string') {

        return [];
    }

    // =========================================
    // 📌 ARRAY FINAL
    // =========================================
    const content = [];

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
        // Identifica o tipo da tag html
        const tagName = element.tagName.toLowerCase();
        
        // Retorna o texto limpo
        const text = cleanText(element.textContent);

        // ignora vazio
        if (!text) {
            return;
        }

        // =====================================
        // HEADINGS
        // =====================================
        if (tagName === 'h1') {

            content.push({
                text,
                style: ['heading1']
            });
            return;
        }

        if (tagName === 'h2') {

            content.push({
                text,
                style: ['heading2']
            });

            return;
        }

        if (tagName === 'h3') {

            content.push({
                text,
                style: ['heading3']
            });

            return;
        }

        if (tagName === 'h4') {

            content.push({
                text,
                style: ['heading4']
            });

            return;
        }

        if (tagName === 'h5') {

            content.push({
                text,
                style: ['heading5']
            });

            return;
        }

        if (tagName === 'h6') {

            content.push({
                text,
                style: ['heading6']
            });

            return;
        }

        // =====================================
        // UL
        // =====================================
        if (tagName === 'ul') {

            const items = [];

            element.querySelectorAll('li')
                .forEach(li => {

                    const itemText =
                        cleanText(li.textContent);

                    if (itemText) {
                        items.push(itemText);
                    }

                });

            if (items.length > 0) {

                content.push({

                    ul: items,

                    style: ['unorderedList'],

                    markerColor: '#000000'

                });
            }

            return;
        }

        // =====================================
        // OL
        // =====================================
        if (tagName === 'ol') {

            const items = [];

            element.querySelectorAll('li')
                .forEach(li => {

                    const itemText =
                        cleanText(li.textContent);

                    if (itemText) {
                        items.push(itemText);
                    }

                });

            if (items.length > 0) {

                content.push({

                    ol: items,

                    style: ['orderedList'],

                    markerColor: '#000000'

                });
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

            content.push({
                text,
                style: styles
            });

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

    console.log('[GENERATE-CLEAN-TEXT.JS] FIM DA FUNÇÃO dados content = ', JSON.stringify(content, null, 2))
    console.log('[GENERATE-CLEAN-TEXT.JS] FIM DA FUNÇÃO')
    return content;
    
}