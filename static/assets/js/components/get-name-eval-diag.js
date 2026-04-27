export function getNameEvaluationDiagnostic(data) {
    let fullName = data.reportData[0].methodName;
    fullName = fullName != '' ? fullName : 'Nome da Avaliação ou Diagnóstico';
    return fullName;
}