export function generateScale({
        parts = [],
        hasLegend
    }) {

    // 🔒 validação
    if (!Array.isArray(parts) || parts.length === 0) {
        console.error('Escala inválida: nenhuma parte informada');
        return { text: 'Escala inválida' };
    }
    // =========================
    // 🔷 LINHA DAS CORES (SEM ESPAÇO)
    // =========================
    const colorColumns = parts.map(part => ({
        width: '*',

        table: {
            widths: ['*'],
            heights: [3],
            body: [
                [
                    {
                        text: ' ', // 👈 necessário pra renderizar altura
                        fontSize: 1,
                        lineHeight: 1,
                        margin: [0, 0, 0, 0]
                    }
                ]
            ]
        },

        layout: {
            fillColor: () => part.color || '#cccccc',
            hLineWidth: () => 0,
            vLineWidth: () => 0
        }
    }));

    if(hasLegend){
        // =========================
        // 📌 CONFIGURAÇÃO DA LEGENDA
        // =========================
        const totalParts = parts.length;

        // quantidade de colunas reais
        const columnsCount = totalParts <= 5
            ? totalParts
            : 5;

        // largura igualitária
        const columnWidth = `${100 / columnsCount}%`;

        // widths da tabela
        const legendWidths = Array(columnsCount).fill(columnWidth);

        // =========================
        // 📌 MONTA AS LINHAS
        // =========================
        const legendBody = [];

        // 1 linha → 3 até 5 itens
        if (totalParts <= 5) {

            const row = [];

            parts.forEach(part => {

                row.push({
                    stack: [
                        {
                            columns: [

                                // 🔴 BOLINHA
                                {
                                    width: 12,

                                    canvas: [
                                        {
                                            type: 'rect',
                                            x: 0,
                                            y: 0,
                                            w: 12,
                                            h: 12,
                                            r: 6,
                                            color: part.color
                                        }
                                    ],

                                    relativePosition: {
                                        y: 0
                                    }
                                },

                                // 🔤 TEXTO
                                {
                                    width: '*',
                                    text: part.label,
                                    fontSize: 10,
                                    margin: [5, 0, 0, 0]
                                }

                            ],

                            columnGap: 0
                        }
                    ],

                    margin: [0, 0, 0, 5]
                });

            });

            legendBody.push(row);

        }

        // 2 linhas → 6 até 10 itens
        else {

            const firstRow = [];
            const secondRow = [];

            parts.forEach((part, index) => {

                const cell = {
                    stack: [
                        {
                            columns: [
                                // BOLINHA DA LEGENDA
                                {
                                    width: 12,
                                    canvas: [
                                        {
                                            type: 'rect',
                                            x: 0,
                                            y: 0,
                                            w: 12,
                                            h: 12,
                                            r: 6,
                                            color: part.color
                                        }
                                    ],
                                    relativePosition: {
                                        y: 0
                                    }
                                },
                                // TEXTO
                                {
                                    width: '*',
                                    text: part.label,
                                    fontSize: 10,
                                    margin: [5, 0, 0, 0]
                                }
                            ],
                            columnGap: 0
                        }
                    ],
                    margin: [0, 0, 0, 5]
                };

                // primeira linha
                if (index < 5) {
                    firstRow.push(cell);
                }
                // segunda linha
                else {
                    secondRow.push(cell);
                }

            });

            // completa linhas faltantes
            while (firstRow.length < 5) {
                firstRow.push({});
            }

            while (secondRow.length < 5) {
                secondRow.push({});
            }

            legendBody.push(firstRow);
            legendBody.push(secondRow);

        }

        // =========================
        // 📦 RETORNO FINAL
        // =========================

        return {

            stack: [

                // ESCALA COLORIDA (SEM GAP)
                {
                    columns: colorColumns,
                    columnGap: 0 // 👈 garante que não exista espaço
                },

                // tabela da legenda
                {
                    table: {
                        widths: legendWidths,
                        body: legendBody
                    },
                    layout: 'noBorders',
                    margin: [0, 5, 0, 0]
                }

            ],

            margin: [0, 10, 0, 10]
        };

    } else {
        // =========================
        // 📦 RETORNO FINAL
        // =========================

        return {

            stack: [

                // ESCALA COLORIDA (SEM GAP)
                {
                    columns: colorColumns,
                    columnGap: 0 // 👈 garante que não exista espaço
                }

            ],

            margin: [0, 10, 0, 10]
        };
    }
}



