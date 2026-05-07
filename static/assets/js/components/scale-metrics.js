export function generateScale({
        parts = [],
        hasLegend = false
    }) {

    // 🔒 validação
    if (!Array.isArray(parts) || parts.length === 0) {
        console.error('Escala inválida: nenhuma parte informada');
        return {
            text: 'Escala inválida'
        };
    }

    // =========================
    // 🔷 LINHA DAS CORES
    // =========================
    const colorColumns = parts.map(part => ({

        width: '*',
        table: {
            widths: ['*'],
            heights: [3],
            body: [
                [
                    {
                        text: ' ',
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

    // =========================
    // 📦 STACK BASE
    // =========================
    const stack = [

        // 🔷 ESCALA COLORIDA
        {
            columns: colorColumns,
            columnGap: 0
        }

    ];

    // =========================
    // 📌 LEGENDA
    // =========================
    if (hasLegend) {

        // quantidade total de partes da escala
        const totalParts = parts.length;
        // máximo de colunas
        const maxColumns = 5;
        // quantidade de colunas reais
        const columnsCount = totalParts <= maxColumns ? totalParts : maxColumns;
        // largura igualitária
        const columnWidth = `${100 / columnsCount}%`;
        // widths da tabela
        const legendWidths = Array(columnsCount).fill(columnWidth);
        // body da tabela
        const legendBody = [];

        // =========================
        // 🧱 FUNÇÃO DA CÉLULA
        // =========================
        function createLegendCell(part) {

            return {
                stack: [
                    {
                        columns: [
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
                                        color: part.color || '#cccccc'
                                    }
                                ],
                                relativePosition: {
                                    y: 0
                                }
                            },
                            {
                                width: '*',
                                text: part.label || '',
                                fontSize: 10,
                                margin: [5, 0, 0, 0]
                            }
                        ],
                        columnGap: 0
                    }
                ],
                margin: [0, 0, 0, 5]
            };
        }

        // =========================
        // 📌 1 LINHA (3 A 5)
        // =========================
        if (totalParts <= maxColumns) {

            const row = [];

            parts.forEach(part => {
                row.push(createLegendCell(part));
            });

            legendBody.push(row);

        } else {
            // =========================
            // 📌 2 LINHAS (6 A 10)
            // =========================

            const firstRow = [];
            const secondRow = [];

            parts.forEach((part, index) => {

                const cell = createLegendCell(part);

                // primeira linha
                if (index < maxColumns) {
                    firstRow.push(cell);
                } else {
                    secondRow.push(cell);
                }

            });

            // completa primeira linha
            while (firstRow.length < maxColumns) {
                firstRow.push({});
            }

            // completa segunda linha
            while (secondRow.length < maxColumns) {
                secondRow.push({});
            }

            legendBody.push(firstRow);
            legendBody.push(secondRow);

        }

        // =========================
        // 📦 TABELA DA LEGENDA
        // =========================
        stack.push({
            table: {
                widths: legendWidths,
                body: legendBody
            },
            layout: 'noBorders',
            margin: [0, 5, 0, 0]
        });
    }

    // =========================
    // 📦 RETORNO FINAL
    // =========================
    return {
        stack,
        margin: [0, 10, 0, 10]
    };
}