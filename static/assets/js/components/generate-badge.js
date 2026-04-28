export function generateBadge(texto, alignment = 'left') {
    const badgeWidth = calcularLarguraTexto(texto);
    let columnsConfig;

    if (alignment === 'left') {
        columnsConfig = [
            criarBadgeInterno(texto, badgeWidth),
            { width: '*', text: '' }
        ];
    } else if (alignment === 'center') {
        columnsConfig = [
            { width: '*', text: '' },
            criarBadgeInterno(texto, badgeWidth),
            { width: '*', text: '' }
        ];
    } else if (alignment === 'right') {
        columnsConfig = [
            { width: '*', text: '' },
            criarBadgeInterno(texto, badgeWidth)
        ];
    }

    return {
        columns: columnsConfig,
        columnGap: 0,
        margin: [0, 5, 0, 5]
    };
}

// 🔧 Badge com posicionamento correto
function criarBadgeInterno(texto, width) {
    return {
        width: width, // 👈 FIXA A LARGURA DO BLOCO
        stack: [
            {
                canvas: [
                    {
                        type: 'rect',
                        x: 0,
                        y: 0,
                        w: width,
                        h: 20,
                        r: 10,
                        color: '#596CFF'
                    }
                ]
            },
            {
                text: texto,
                color: '#ffffff',
                alignment: 'center',
                width: width,
                margin: [0, -15, 0, 0], // leve ajuste vertical apenas
                fontSize: 9,
                bold: true
            }
        ]
    };
}

// 📏 cálculo de largura mais estável
function calcularLarguraTexto(texto) {
    const larguraPorChar = 5.8; // ajuste fino melhor
    const padding = 10;
    let leghtText = texto.length;
    const largura = (texto.length * larguraPorChar) + padding;
    return Math.max(50, largura);
}