import zones from './zones.json'

export const getZoneId = (zoneName) => {
    const filterZones = zones.filter(zoneObj => {
        if (
          zoneObj.zone === "Barrio Salamanca" ||
          zoneObj.zone === "La Moraleja" ||
          zoneObj.zone === "Somosaguas" ||
          zoneObj.zone === "Zona España - Hispanoamérica" ||
          zoneObj.zone === "Puerta de Hierro" ||
          zoneObj.zone === "Colonia Fuentelarreyna"
        )
        {
            if (zoneName.includes(zoneObj.zone)) return zoneObj._id
        } else if (zoneObj.zone === "Residencial"){
            if (zoneName.includes(zoneObj.name)) return zoneObj._id
        } 
    })
    return filterZones.map(zone => zone._id)
}