import { generateCleanText } from "./generate-clean-text.js"

export function getRecommendation(data) {

    const publicGroups = data.reportData[0].public_groups

    let internalBody = []

    const tableRecommendations = {
        table: {
            dontBreakRows: true,
            widths: ['100%'],
            body: internalBody
        },
        layout: {
            hLineWidth: () => 0,
            vLineWidth: () => 0,
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

    internalBody.push(
        [{
            width: '*',
            text:'RECOMENDAÇÕES',
            fontSize: 10,
            color:'#000000',
            alignment:'center',
            margin:[0,10,0,10]
        }]
    )

    for (const group of publicGroups) {

        let groupName = group.groupName
        let questionList = group.answersGroupName
        // Insere o nome grupo de publico
        internalBody.push([
                {
                    text: groupName,
                    width: '*',
                    fontSize: 10,
                    color:'#0f1cd1',
                    alignment:'left',
                    margin:[0,0,0,0]
                }
            ]
        )

        for (const [index, questionGroup] of questionList.entries()) {
            let grouperName = questionGroup.groupNameAnswer
            let questionGrouperAverage = questionGroup.finalAverage
            let formatedAverage = (questionGrouperAverage * 100)
            let groupListQuestion = questionGroup.groupQuestionsList

            internalBody.push([
                {
                    text: grouperName,
                    width: '*',
                    fontSize: 10,
                    color:'#000000',
                    alignment:'left',
                    margin:[10,0,0,0]
                }
            ])
            
            // Insere a recomendação para o agrupador
            const recommendationList = data.dataRecommendation
            const recommendationItem = recommendationList[index]
            const nameLabel = recommendationList[index].label
            const recommendationGrouperList = recommendationList[index].meta.recommendations

            const filteredRecommendation = recommendationGrouperList.find(
                    recommendation => formatedAverage >= recommendation.start && formatedAverage <= recommendation.end
                )

            const selectedRecommendation = filteredRecommendation.recommendations

            for (const itemRecommendation of recommendationGrouperList) {
                const concept = itemRecommendation.concept
                const start = itemRecommendation.start
                const end = itemRecommendation.end
                const recommendationSelected = itemRecommendation.recommendations

                let validation = null;

                if (start === 0) { 
                    validation = formatedAverage >= start && formatedAverage <= end
                } else {
                    validation = formatedAverage > start && formatedAverage <= end
                }

                if (validation) {
                    
                    internalBody.push([
                        {
                            text: concept,
                            width: '*',
                            fontSize: 10,
                            color:'#191092',
                            alignment:'left',
                            margin:[20,0,0,0]
                        }
                    ])

                    generateCleanText(selectedRecommendation, internalBody)

                }
            }

            // Insere as perguntas de cada bloco
            for (const question of groupListQuestion) {
                let questionDescription = question.questionName

                internalBody.push([
                    {
                        text: questionDescription,
                        width: '*',
                        fontSize: 10,
                        color:'#000000',
                        alignment:'left',
                        margin:[20,0,0,0]
                    }
                ])
            }
        }
    }

    return tableRecommendations
}