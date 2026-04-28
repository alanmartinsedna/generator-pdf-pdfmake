export function generateMetricsFromData(data) {

    // =========================
    // 📊 CÁLCULO (SEU CÓDIGO)
    // =========================
    let publicGroups = data.reportData[0].public_groups;

    let totalPublicInvited = 0;
    let totalPublicThatAnswered = 0;
    let totalPublicThatNotAnswered = 0;

    for (const gropup of publicGroups) {
        let totalPublicGroup = gropup.peopleGroup.totalPeople;
        let totalPeopleAnswered = gropup.peopleGroup.answered;
        let totalPeopleNotAnswered = gropup.peopleGroup.notAnswered;

        totalPublicInvited += totalPublicGroup;
        totalPublicThatAnswered += totalPeopleAnswered;
        totalPublicThatNotAnswered += totalPeopleNotAnswered;
    }

    // =========================
    // 📐 TRATAMENTO DOS VALORES
    // =========================

    // evitar divisão por zero
    let percentualPendentes = 0;

    if (totalPublicInvited > 0) {
        percentualPendentes = ((totalPublicThatNotAnswered / totalPublicInvited) * 100)
            .toFixed(1); // 1 casa decimal
    }

    // =========================
    // 🧱 RETORNO DA TABELA
    // =========================
    return {
        table: {
            widths: ['*', '*', '*', '16.6667%', '16.6667%', '16.6667%'],
            body: [
                [
                    { text: '' },
                    { text: '' },
                    { text: '' },

                    // 🔴 PENDENTES (%)
                    {
                        stack: [
                            {
                                text: [
                                    { text: 'Pendentes\n', fontSize: 11, color: '#000000', bold: true },
                                    { text: 'diagnósticos', fontSize: 9, color: '#000000' }
                                ],
                                margin: [0, 0, 0, 15],
                                alignment: 'left'
                            },
                            {
                                text: `${percentualPendentes}%`,
                                fontSize: 16,
                                bold: true,
                                color: '#000000',
                                alignment: 'left'
                            }
                        ]
                    },

                    // 🟢 RESPONDIDAS
                    {
                        stack: [
                            {
                                text: [
                                    { text: 'Respondidas\n', fontSize: 11, color: '#000000', bold: true },
                                    { text: 'diagnósticos', fontSize: 9, color: '#000000' }
                                ],
                                margin: [0, 0, 0, 15],
                                alignment: 'left'
                            },
                            {
                                text: `${totalPublicThatAnswered}`,
                                fontSize: 16,
                                bold: true,
                                color: '#000000',
                                alignment: 'left'
                            }
                        ]
                    },

                    // 🔵 PÚBLICO TOTAL
                    {
                        stack: [
                            {
                                text: [
                                    { text: 'Público total\n', fontSize: 11, color: '#000000', bold: true },
                                    { text: 'pessoas', fontSize: 9, color: '#000000' }
                                ],
                                margin: [0, 0, 0, 15],
                                alignment: 'left'
                            },
                            {
                                text: `${totalPublicInvited}`,
                                fontSize: 16,
                                bold: true,
                                color: '#000000',
                                alignment: 'left'
                            }
                        ]
                    }
                ]
            ]
        },

        layout: {
            hLineWidth: () => 0,

            vLineWidth: (i) => {
                if (i === 3 || i === 4 || i === 5) return 2;
                return 0;
            },

            vLineColor: (i) => {
                if (i === 3) return '#BA2A9B';
                if (i === 4) return '#65d34a';
                if (i === 5) return '#0077c2';
                return null;
            },

            paddingLeft: () => 10,
            paddingRight: () => 10,
            paddingTop: () => 0,
            paddingBottom: () => 0
        },

        margin: [0, 20, 0, 20]
    };
}