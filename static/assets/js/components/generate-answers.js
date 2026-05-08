export function generateTableAnswers(answersData){

    const globalAnswersList = answersData

    let internalBodyAnswers = []

    const tableAnswers = {
        table: {
            dontBreakRows: true,
            widths: ['75%', '25%'],
            body: internalBodyAnswers
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

    internalBodyAnswers.push(
        [{
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
        }]
    )

    for (const questionGroup of globalAnswersList) {

        let groupTitleName = questionGroup.groupNameAnswer
        let groupTitlAverage = Number(questionGroup.finalAverage)
        const formatedGroupTitlAverage = `${(groupTitlAverage * 100)}%`
        let questionsList = questionGroup.groupQuestionsList

        internalBodyAnswers.push([
                {
                    text: groupTitleName,
                    width: '*',
                    fontSize: 10,
                    color:'#0f1cd1',
                    alignment:'left',
                    margin:[0,0,0,0]
                },
                {
                    width:'*',
                    text: formatedGroupTitlAverage,
                    fontSize: 10,
                    color:'##000000',
                    alignment:'center'
                }
            ]
        )

        for (const questionItem of questionsList) {
            let nameQuestion = questionItem.questionName
            let questionAverage = questionItem.questionFinalAverage

            const formatedQuestionAverage = `${(questionAverage * 100)}%`

            internalBodyAnswers.push([
                {
                    text: nameQuestion,
                    width: '*',
                    fontSize: 10,
                    color:'#000000',
                    alignment:'left',
                    margin:[10,0,0,0]
                },
                {
                    width:'*',
                    text: formatedQuestionAverage,
                    fontSize: 10,
                    color:'##000000',
                    alignment:'center'
                }
            ])
        }
    }

    return tableAnswers
}