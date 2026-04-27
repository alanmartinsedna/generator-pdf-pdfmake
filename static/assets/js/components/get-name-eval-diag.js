export function getNameEvaluationDiagnostic(data) {
    console.log('IMPORTADO SCRIPT DE ARQUIVO EXTERNO - Dados recebidos para extração do nome:', data);
    let fullName = data.reportData[0].methodName;
    fullName = fullName != '' ? fullName : 'Diagnóstico de Riscos Psicossociais VALOR DA VARIAVEL VAZIA';

    return fullName;
}