export function generateTopic({
    text,
    align = 'left', // left | center | right
    fontSize = 11,
    bold = true,
    color = '#000000',
    backgroundColor = '#FFFFFF',
    height = 25
}) {

    // cálculo de padding vertical correto
    const lineHeight = fontSize * 1.2;
    const paddingVertical = Math.max(0, (height - lineHeight) / 2);

    return {
        table: {
            widths: ['*'],
            body: [
                [
                    {
                        text: text,
                        alignment: align,
                        color: color,
                        fontSize: fontSize,
                        bold: bold
                    }
                ]
            ]
        },

        layout: {
            fillColor: () => backgroundColor,
            hLineWidth: () => 0,
            vLineWidth: () => 0,

            paddingLeft: () => 10,
            paddingRight: () => 10,

            // 👇 AQUI está a correção real
            paddingTop: () => paddingVertical,
            paddingBottom: () => paddingVertical
        },

        margin: [0, 20, 0, 10]
    };
}