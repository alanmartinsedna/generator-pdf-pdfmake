export function getGlobalAverageAnswers(answersData) {
    const reportData = Array.isArray(answersData?.reportData)
        ? answersData.reportData
        : [];
    const publicGroups = Array.isArray(reportData[0]?.public_groups)
        ? reportData[0].public_groups
        : [];

    if (publicGroups.length === 0) {
        return [];
    }

    // Estrutura agregadora baseada em índice:
    // blockIndex -> questionIndex, sem comparar por ID/nome.
    const aggregatedBlocks = [];

    publicGroups.forEach((publicGroup) => {
        const answersGroupName = Array.isArray(publicGroup?.answersGroupName)
            ? publicGroup.answersGroupName
            : [];

        answersGroupName.forEach((block, blockIndex) => {
            const groupNameAnswer = block?.groupNameAnswer ?? "";
            const groupNameId = block?.groupNameId ?? "";
            const finalAverage = Number(block?.finalAverage ?? 0);
            const groupQuestionsList = Array.isArray(block?.groupQuestionsList)
                ? block.groupQuestionsList
                : [];

            if (!aggregatedBlocks[blockIndex]) {
                aggregatedBlocks[blockIndex] = {
                    groupNameAnswer,
                    groupNameId,
                    finalAverageTotal: 0,
                    finalAverageCount: 0,
                    questions: [],
                };
            }

            const currentBlock = aggregatedBlocks[blockIndex];

            // Preserva metadados do bloco com prioridade para o primeiro valor válido
            if (!currentBlock.groupNameAnswer && groupNameAnswer) {
                currentBlock.groupNameAnswer = groupNameAnswer;
            }
            if (!currentBlock.groupNameId && groupNameId) {
                currentBlock.groupNameId = groupNameId;
            }

            currentBlock.finalAverageTotal += finalAverage;
            currentBlock.finalAverageCount += 1;

            groupQuestionsList.forEach((question, questionIndex) => {
                const questionName = question?.questionName ?? "";
                const questionFinalAverage = Number(question?.questionFinalAverage ?? 0);

                if (!currentBlock.questions[questionIndex]) {
                    currentBlock.questions[questionIndex] = {
                        questionName,
                        total: 0,
                        count: 0,
                    };
                }

                const currentQuestion = currentBlock.questions[questionIndex];
                if (!currentQuestion.questionName && questionName) {
                    currentQuestion.questionName = questionName;
                }
                currentQuestion.total += questionFinalAverage;
                currentQuestion.count += 1;
            });
        });
    });

    const finalGlobalAnswers = aggregatedBlocks
        .filter(Boolean)
        .map((block) => {
        const finalAverage =
            block.finalAverageCount > 0
                ? Number((block.finalAverageTotal / block.finalAverageCount).toFixed(4))
                : 0;

        const groupQuestionsList = block.questions
            .filter(Boolean)
            .map((question) => {
                const avg =
                    question.count > 0
                        ? Number((question.total / question.count).toFixed(4))
                        : 0;

                return {
                    questionName: question.questionName,
                    questionFinalAverage: avg,
                };
            });

            return {
                groupNameAnswer: block.groupNameAnswer,
                groupNameId: block.groupNameId,
                finalAverage,
                groupQuestionsList,
            };
        });

    return finalGlobalAnswers;
}
