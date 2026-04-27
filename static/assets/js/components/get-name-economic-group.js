export function getNameEconomicGroup(data) {
    console.log('IMPORTADO SCRIPT DE ARQUIVO EXTERNO - Dados recebidos para extração do nome:', data);
    let economicGroupName = data.reportData[0].economicGroup;
    economicGroupName = economicGroupName != '' ? economicGroupName : 'Grupo Economico não localizado';

    return economicGroupName;
}