export function getNameEconomicGroup(data) {
    let economicGroupName = data.reportData[0].economicGroup;
    economicGroupName = economicGroupName != '' ? economicGroupName : 'Grupo Econômico';
    return economicGroupName;
}