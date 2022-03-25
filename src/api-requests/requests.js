const baseUrlResidential = 'https://www.gvrecrm.com/';

export const getResidential = () => {
    return fetch(`${baseUrlResidential}ads`, {
        method:'GET',
        cors: true
    }).then((response)=> response.json())
}

export const getResidentialItem = (id) => {
    return fetch (`${baseUrlResidential}?id=${id}`, {
        method:'GET',
        cors: true
    }).then ((response) => response.json())
}

export const getConsultants = () => {
    return fetch(`${baseUrlResidential}consultants`, {
        method:'GET',
        cors: true
    }).then((response)=> response.json())
}