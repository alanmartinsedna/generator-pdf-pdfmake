export function getPeriodTimeEvaluationDiagnostic(data) {
    let durationPeriod = data.reportData[0].durationPeriod;
    let startDate = durationPeriod.startDate;
    let endDate = durationPeriod.endDate;

    if (
        !durationPeriod !='' || durationPeriod == undefined || durationPeriod == null || 
        !startDate !='' || startDate == undefined || startDate == null || 
        !endDate !='' || endDate == undefined || endDate == null
        ) {
        console.warn('[GET PERIOD EVAL DIAG.JS] Duração do período não encontrada ou inválida. Retornando valor padrão.');
        return 'Período não informado';
        
    } else {
        let formatedPeriod = ''
        formatedPeriod = `Respostas entre ${startDate} e ${endDate}`;
        return formatedPeriod;
    }

}