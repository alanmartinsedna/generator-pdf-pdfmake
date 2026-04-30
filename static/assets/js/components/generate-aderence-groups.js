export function generateAderenceTableGroups(data) {
    console.log('[GENERATE-ADERENCE-GROUPS.JS] Início do script');

    let publicGroups = data.reportData[0].public_groups;

    let elements = [];
    let index = 0;

    for (const group of publicGroups) {

        let groupName = group.groupName;
        let totalPublicGroup = group.peopleGroup.totalPeople;
        let totalPeopleAnswered = group.peopleGroup.answered;
        let totalPeopleNotAnswered = group.peopleGroup.notAnswered;

        let historicUserTimelIneByGroup = group.peopleGroup.historicUserTimelIne || [];

        let percentageAnswered = totalPublicGroup > 0 
            ? (totalPeopleAnswered / totalPublicGroup) * 100 
            : 0;

        let percentageNotAnswered = totalPublicGroup > 0 
            ? (totalPeopleNotAnswered / totalPublicGroup) * 100 
            : 0;

        // =========================
        // 📌 TABELA 1 → MÉTRICAS
        // =========================
        const tableMetrics = {
            table: {
                widths: ['50%', '25%', '25%'],
                body: [
                    [
                        {
                            text: groupName,
                            fontSize: 16,
                            bold: true
                        },

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
                    ]
                ]
            },

            layout: {
                fillColor: '#f5f5f5',
                hLineWidth: () => 0,
                vLineWidth: (i) => (i === 1 || i === 2 ? 2 : 0),
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

            margin: [0, 10, 0, 5]
        };

        // =========================
        // 📌 TABELA 2 → TIMELINE
        // =========================
        let internalBody = [];

        // HEADER
        internalBody.push([
            { text:'Participante', style: 'mainRowInternalTable', alignment: 'left', valign: 'middle' },
            { text:'Adicionado em:', style: 'mainRowInternalTable', alignment: 'center', valign: 'middle' },
            { text:'Última notificação', style: 'mainRowInternalTable', alignment: 'center', valign: 'middle' },
            { text:'Último acesso', style: 'mainRowInternalTable', alignment: 'center', valign: 'middle' },
            { text:'Respondido em:', style: 'mainRowInternalTable', alignment: 'center', valign: 'middle' },
            { text:'Total notificações', style: 'mainRowInternalTable', alignment: 'center', valign: 'middle' },
        ]);

        if (historicUserTimelIneByGroup.length > 0) {

            for (const userTimeline of historicUserTimelIneByGroup) {

                let userName = userTimeline.userName || '-';
                let userEmail = userTimeline.userEmail || '-';
                let userNameEmail = `${userName}\n${userEmail}`;

                let invitedAtDate = userTimeline.invitedAtDate || '-';
                let lastNotificationDate = userTimeline.lastNotificationDate || '-';
                let lastAccessDate = userTimeline.lastAccessDate || '-';
                let answeredDate = userTimeline.answeredDate || '-';
                let totalNotifications = userTimeline.totalNotifications ?? '-';

                internalBody.push([
                    // COLUNA 1 → LEFT + MIDDLE
                    {
                        text: userNameEmail,
                        style:'rowsInternalTable',
                        alignment: 'left',
                        valign: 'middle'
                    },

                    // COLUNAS 2+ → CENTER + MIDDLE
                    {
                        text: invitedAtDate,
                        style:'rowsInternalTable',
                        alignment: 'center',
                        valign: 'middle'
                    },
                    {
                        text: lastNotificationDate,
                        style:'rowsInternalTable',
                        alignment: 'center',
                        valign: 'middle'
                    },
                    {
                        text: lastAccessDate,
                        style:'rowsInternalTable',
                        alignment: 'center',
                        valign: 'middle'
                    },
                    {
                        text: answeredDate,
                        style:'rowsInternalTable',
                        alignment: 'center',
                        valign: 'middle'
                    },
                    {
                        text: totalNotifications,
                        style:'rowsInternalTable',
                        alignment: 'center',
                        valign: 'middle'
                    }
                ]);
            }

        } else {
            internalBody.push([
                {
                    text: 'Sem dados',
                    colSpan: 6,
                    alignment: 'center',
                    margin: [0,10,0,10]
                },
                {}, {}, {}, {}, {}
            ]);
        }

        const tableTimeline = {
            table: {
                headerRows: 1,
                widths: ['25%', '15%', '15%', '15%', '15%', '15%'],
                heights: function (rowIndex) {
                    return rowIndex === 0 ? 40 : 28;
                },
                body: internalBody
            },

            layout: {
                fillColor: (rowIndex) =>
                    rowIndex === 0 ? '#e9ecef' : '#ffffff',
                hLineWidth: () => 0.5,
                vLineWidth: () => 0.5
            },

            margin: [0, 0, 0, 10]
        };

        elements.push(tableMetrics);
        elements.push(tableTimeline);

        index++;
    }

    return elements;
}