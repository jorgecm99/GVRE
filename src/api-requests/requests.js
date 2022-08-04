const baseUrlResidential = 'https://www.gvrecrm.com/';
// const newBaseUrlResidential = 'http://localhost:3500/ads/web/department=Residencial&page=1';
const newBaseUrlResidential = 'https://api.vamosaporello.com/ads/web/department=Residencial&showOnWeb=true&page=1';
const newBaseUrlPatrimonial = 'https://api.vamosaporello.com/ads/web/department=Patrimonio&showOnWeb=true';

const requestBaseParams = {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}

export const getResidential = async (filters) => {
    const filterParams = new URLSearchParams(filters)
    const urlWithFilters = !!filterParams ? `${newBaseUrlResidential}&${filterParams.toString()}` : `${newBaseUrlResidential}`;
    const newUrl = new URL(urlWithFilters)

    const response = await fetch(newUrl, requestBaseParams)
    const adsInfo = await response.json()
    console.log(adsInfo)
    return adsInfo
}

export const getPatrimonial = (filters) => {
    let filterParams = ''
    new URLSearchParams(filters).forEach((value, key) => {
        filterParams = `${filterParams}&${key}=${value}`
    })

    const urlWithFilters = filterParams ? `${newBaseUrlPatrimonial}${filterParams}` : `${newBaseUrlPatrimonial}`;

    return fetch(urlWithFilters, requestBaseParams).then(response => response.json())
}


/*export const getResidential = () => {
    return fetch(`${newBaseUrlResidential}ads`, {
        method:'GET',
        cors: true
    }).then((response)=> response.json())
}*/

export const getResidentialItem = (id) => {
    return fetch(`${baseUrlResidential}?id=${id}`, {
        method: 'GET',
        cors: true
    }).then((response) => response.json())
}

export const getConsultants = () => {
    return fetch(`${baseUrlResidential}consultants`, {
        method: 'GET',
        cors: true
    }).then((response) => response.json())
}