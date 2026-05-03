export function generateScale({
        parts = []
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
            heights: [5],
            body: [
                [
                    {
                        text: ' ', // 👈 necessário pra renderizar altura
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
    // 🔤 LINHA DOS TEXTOS
    // =========================
    const labelColumns = parts.map(part => ({
        width: '*',
        text: part.label || '',
        alignment: 'center',
        fontSize: 10,
        margin: [0, 5, 0, 0]
    }));

    // =========================
    // 📦 RETORNO FINAL
    // =========================
    return {
        stack: [

            // 🔷 ESCALA COLORIDA (SEM GAP)
            {
                columns: colorColumns,
                columnGap: 0 // 👈 garante que não exista espaço
            },

            // 🔤 TEXTOS ABAIXO CENTRALIZADOS
            {
                columns: labelColumns,
                columnGap: 0
            }

        ],

        margin: [0, 10, 0, 10]
    };
}