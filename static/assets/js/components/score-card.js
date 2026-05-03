export function generateScoreCard(percentage,statusText,colorContext) {

    let cardWidth = 200
    let cardHeight = 130
    const circleDiameter = 60;
    const circleRadius = circleDiameter / 2;
    const centerX = cardWidth / 2;
    const circleY = 45; // posição vertical dentro do card
    let percentageValue = Number(percentage);
    let statusCard = statusText;
    let cardColor = colorContext;
    
    if (percentageValue < 0 || percentageValue === '' || isNaN(percentageValue) || percentageValue === null || percentageValue === undefined) {
        console.error("Campo de percentual obigatório! Valor percentual menor que zero ou inválido");
        percentageValue = 0
    } else if (percentageValue >= 0 && percentageValue <= 100) {
        percentageValue = percentageValue.toFixed(0)
    } else if (percentageValue > 100) {
        percentageValue = 100
    }

    if (statusCard === '' || statusCard === ' ' || statusCard === null || statusCard === undefined) {
        console.error("Campo de status obigatório! String de status vazia ou inválida");
        statusCard = 'Sem Status!'
    } else if (statusCard !== '') {
        statusCard = statusCard
    }

    if (cardColor === '' || cardColor === ' ' || cardColor === null || cardColor === undefined) {
        console.error("Campo de cor obigatório! String de cor vazia ou inválida");
        cardColor = '#353134'
    } else if (cardColor !== '') {
        cardColor = cardColor
    }

    return {
        stack: [
            // CARD + CÍRCULO NO MESMO CANVAS
            {
                canvas: [
                    // RETÂNGULO
                    {
                        type: 'rect',
                        x: 0,
                        y: 0,
                        w: cardWidth,
                        h: cardHeight,
                        r: 12,
                        color: cardColor
                    },
                    // CÍRCULO CENTRALIZADO
                    {
                        type: 'ellipse',
                        x: centerX,
                        y: circleY,
                        r1: circleRadius,
                        r2: circleRadius,
                        color: '#FFFFFF'
                    }
                ],
                alignment: 'center'
            },
            // TEXTO DENTRO DO CÍRCULO
            {
                text: `${percentageValue} %`,
                fontSize: 18,
                bold: true,
                color: cardColor,
                alignment: 'center',
                margin: [0, -cardHeight + circleY - 10, 0, 0]
            },
            // STATUS
            {
                columns: [
                    { width: '*', text: '' },
                    {
                        width: cardWidth - 10,
                        text: statusCard,
                        fontSize: 14,
                        bold: true,
                        color: '#FFFFFF',
                        alignment: 'center',
                    },
                    { width: '*', text: '' },
                ],
                margin: [5, 30, 10, 5],
            }
        ],
        alignment: 'center',
        margin: [0, 20, 0, 20]
    };
}