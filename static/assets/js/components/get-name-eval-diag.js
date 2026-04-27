export function getNameEvaluationDiagnostic(data) {
    let fullName = data.reportData[0].methodName;
    fullName = fullName != '' ? fullName : 'Diagnóstico de Riscos Psicossociais';
    return fullName;
}