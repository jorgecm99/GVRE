import zones from './zones.json'

export const getZoneId = (zoneName) => {
    const filterZones = zones.filter(zoneObj => {
        if (!zoneObj.zone === "Residencial" && !zoneObj.zone === "Patrimonio") {
            if (zoneName.includes(zoneObj.zone)) return zoneObj._id
        }
        else { if (zoneName.includes(zoneObj.name)) return zoneObj._id }
    })
    return filterZones.map(zone => zone._id)
}