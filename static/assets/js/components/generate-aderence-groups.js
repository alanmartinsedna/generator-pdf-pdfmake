export function generateAderenceTableGroups(data) {
    console.log('[GENERATE-ADERENCE-GROUPS.JS] Início do script');

    let publicGroups = data.reportData[0].public_groups;

    let tables = [];

    for (const group of publicGroups) {

        let groupName = group.groupName;
        let totalPublicGroup = group.peopleGroup.totalPeople;
        let totalPeopleAnswered = group.peopleGroup.answered;
        let totalPeopleNotAnswered = group.peopleGroup.notAnswered;

        let percentageAnswered = totalPublicGroup > 0 
            ? (totalPeopleAnswered / totalPublicGroup) * 100 
            : 0;

        let percentageNotAnswered = totalPublicGroup > 0 
            ? (totalPeopleNotAnswered / totalPublicGroup) * 100 
            : 0;

        const table = {
            table: {
                widths: ['50%', '25%', '25%'],
                body: [
                    [
                        { 
                            text: groupName,
                            fontSize: 16,
                            bold: true
                        },

                        // 🔴 PENDENTES
                        {
                            stack: [
                                {
                                    text: [
                                        { text: 'Pendentes(s)\n', fontSize: 11, bold: true },
                                        { text: `${totalPeopleNotAnswered} Pessoa(s)`, fontSize: 9 }
                                    ],
                                    margin: [0, 0, 0, 10]
                                },
                                {
                                    text: `${percentageNotAnswered.toFixed(1)}%`,
                                    fontSize: 16,
                                    bold: true,
                                    color: '#BA2A9B'
                                }
                            ]
                        },

                        // 🟢 RESPONDIDAS
                        {
                            stack: [
                                {
                                    text: [
                                        { text: 'Respondida(s)\n', fontSize: 11, bold: true },
                                        { text: `${totalPeopleAnswered} Pessoa(s)`, fontSize: 9 }
                                    ],
                                    margin: [0, 0, 0, 10]
                                },
                                {
                                    text: `${percentageAnswered.toFixed(1)}%`,
                                    fontSize: 16,
                                    bold: true,
                                    color: '#65d34a'
                                }
                            ]
                        }
                    ],
                    [
                        {
                            colSpan: 3,
                            margin: [5,5,5,5],
                            table: {
                                headerRows: 1,
                                widths: ['25%', '15%', '15%', '15%', '15%', '15%'],
                                body: [
                                    [
                                        {text:'Participante', style: 'mainRowInternalTable'},
                                        {text:'Adicionado em:', style: 'mainRowInternalTable'},
                                        {text:'Última notificação', style: 'mainRowInternalTable'},
                                        {text:'Último acesso', style: 'mainRowInternalTable'},
                                        {text:'Respondido em:', style: 'mainRowInternalTable'},
                                        {text:'Total notificações', style: 'mainRowInternalTable'},
                                    ],
                                    [
                                        {text:'João Silva', style:'rowsInternalTable'},
                                        {text:'01/03/2026', style:'rowsInternalTable'},
                                        {text:'05/03/2026', style:'rowsInternalTable'},
                                        {text:'N/A', style:'rowsInternalTable'},
                                        {text:'N/A', style:'rowsInternalTable'},
                                        {text:'2', style:'rowsInternalTable'}
                                    ],
                                    [
                                        {text:'Maria Souza', style:'rowsInternalTable'},
                                        {text:'02/03/2026', style:'rowsInternalTable'},
                                        {text:'06/03/2026', style:'rowsInternalTable'},
                                        {text:'07/03/2026', style:'rowsInternalTable'},
                                        {text:'07/03/2026', style:'rowsInternalTable'},
                                        {text:'3', style:'rowsInternalTable'}
                                    ],
                                    [
                                        {text:'Carlos Lima', style:'rowsInternalTable'},
                                        {text:'03/03/2026', style:'rowsInternalTable'},
                                        {text:'07/03/2026', style:'rowsInternalTable'},
                                        {text:'08/03/2026', style:'rowsInternalTable'},
                                        {text:'08/03/2026', style:'rowsInternalTable'},
                                        {text:'1', style:'rowsInternalTable'}
                                    ],
                                ]
                            },
                            layout: {
                                fillColor: function (rowIndex) {
                                    if (rowIndex === 0) {
                                        return '#e9ecef'
                                    } else if (rowIndex >= 1) {
                                        return '#ffffff'
                                    }; 
                                },
                                
                            }
                        },
                        {},
                        {},
                    ]
                ]
            },
            layout: {
                fillColor: '#f5f5f5',
                hLineWidth: () => 0,
                vLineWidth: (i) => {
                    if (i === 1 || i === 2) return 2;
                    return 0;
                },
                vLineColor: (i) => {
                    if (i === 1) return '#BA2A9B';
                    if (i === 2) return '#65d34a';
                    return null;
                },
                paddingLeft: () => 10,
                paddingRight: () => 10,
                paddingTop: () => 10,
                paddingBottom: () => 10
            },
            margin: [0, 10, 0, 10] // 👈 importante pra separar visualmente
        };

        tables.push(table);
    }

    return tables;
}