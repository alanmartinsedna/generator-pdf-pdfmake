export function generateTableAnswers(answersData){

    
    let publicGroups = answersData.reportData[0].public_groups;


    console.log('[GENERATE-ANSWERS.JS] publicGroups = ',publicGroups)

    return {
        table: {
            dontBreakRows: true,
            widths: ['75%', '25%'],
            body:[
                [
                    {
                        width: '*',
                        text:'ASSUNTO',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'center',
                        margin:[0,10,0,10]
                    },
                    {
                        width:'*',
                        text:'MÉDIA DOS GRUPOS',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center',
                        margin:[0,10,0,10]
                    }
                ],
                [
                    {
                        width: '*',
                        text:'1. ORGANIZAÇÃO DE DEMANDAS',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left'
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center'
                    }
                ],
                [
                    {
                        width: '*',
                        text:'Consigo concluir minhas tarefas dentro do horário normal de trabalho.',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left',
                        margin:[10,0,0,0]
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center'
                    }
                ],
                [
                    {
                        width: '*',
                        text:'O ritmo de trabalho permite realizar as atividades com atenção e qualidade.',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left',
                        margin:[10,0,0,0]
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center',
                        
                    }
                ],
                [
                    {
                        width: '*',
                        text:'As metas e prazos são definidos de forma clara antes do início das atividades.',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left',
                        margin:[10,0,0,0]
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center'
                    }
                ],
                [
                    {
                        width: '*',
                        text:'Quando surgem novas tarefas, elas são explicadas antes de serem cobradas',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left',
                        margin:[10,0,0,0]
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center'
                    }
                ],
                [
                    {
                        width: '*',
                        text:'O trabalho é dividido de maneira equilibrada entre as pessoas da equipe.',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left',
                        margin:[10,0,0,0]
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center'
                    }
                ],
                [
                    {
                        width: '*',
                        text:'Preciso acelerar demais o ritmo para conseguir cumprir minhas tarefas.',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left',
                        margin:[10,0,0,0]
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center'
                    }
                ],
                [
                    {
                        width: '*',
                        text:'2. AUTONOMIA E CAPACIDADE DE EXECUÇÃO',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left'
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center'
                    }
                ],
                [
                    {
                        width: '*',
                        text:'Tenho liberdade para organizar a forma como realizo meu trabalho.',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left',
                        margin:[10,0,0,0]
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center'
                    }
                ],
                [
                    {
                        width: '*',
                        text:'A equipe é ouvida antes de decisões que afetam o trabalho diário.',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left',
                        margin:[10,0,0,0]
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center'
                    }
                ],
                [
                    {
                        width: '*',
                        text:'Posso ajustar minha rotina quando surgem mudanças ou imprevistos.',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left',
                        margin:[10,0,0,0]
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center'
                    }
                ],
                [
                    {
                        width: '*',
                        text:'Quando sugiro melhorias, recebo retorno sobre minha sugestão.',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left',
                        margin:[10,0,0,0]
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center'
                    }
                ],
                [
                    {
                        width: '*',
                        text:'Tenho autonomia suficiente para resolver situações simples do dia a dia.',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left',
                        margin:[10,0,0,0]
                    },
                    {
                        width:'*',
                        text:'100%',
                        fontSize: 10,
                        color:'##000000',
                        alignment:'center'
                    }
                ],
            ]
        },
        layout: {
             hLineWidth: () => 1,
            vLineWidth: () => 1,
            hLineColor: () => '#000000',
            vLineColor: () => '#000000',
            fillColor: (rowIndex) =>
                rowIndex === 0 ? '#e9ecef' : '#ffffff',
            paddingLeft: () => 5,
            paddingRight: () => 5,
            paddingTop: () => 5,
            paddingBottom: () => 5
        }
    }
    
}