const baseUrlResidential = 'https://api.vamosaporello.com/inmuebles/';
const baseUrlConsultants = 'https://www.gvrecrm.com/';
const newBaseUrlResidential = 'https://api.vamosaporello.com/inmuebles/web/department=Residencial&showOnWeb=true';
const newBaseUrlPatrimonial = 'https://api.vamosaporello.com/inmuebles/web/department=Patrimonio&showOnWeb=true';

const requestBaseParams = {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
}

export const getResidential = async (filters) => {
    console.log(filters)
    const filterParams = new URLSearchParams(filters)
    const urlWithFilters = !!filterParams ? `${newBaseUrlResidential}&${filterParams.toString()}` : `${newBaseUrlResidential}`;
    console.log(urlWithFilters)
    const newUrl = new URL(urlWithFilters)
    console.log(newUrl)

    const response = await fetch(newUrl, requestBaseParams)
    const adsInfo = await response.json()
    console.log(adsInfo)
    return adsInfo
}

export const getPatrimonial = async (filters) => {
    console.log(filters)
    const filterParams = new URLSearchParams(filters)
    const urlWithFilters = !!filterParams ? `${newBaseUrlPatrimonial}&${filterParams.toString()}` : `${newBaseUrlPatrimonial}`;
    console.log(urlWithFilters)
    const newUrl = new URL(urlWithFilters)
    console.log(newUrl)

    const response = await fetch(newUrl, requestBaseParams)
    const adsInfo = await response.json()
    console.log(adsInfo)
    return adsInfo
}

export const getResidentialItem = async (id) => {
    const response = await fetch(`${baseUrlResidential}${id}`, requestBaseParams)
    console.log(response)
    const adInfo = await response.json()
    console.log(adInfo)
    return [adInfo]
}

export const getPatrimonialItem = async (id) => {
    const response = await fetch(`${baseUrlResidential}${id}`, requestBaseParams)
    console.log(response)
    const adInfo = await response.json()
    console.log(adInfo)
    return [adInfo]
}

export const getConsultants = () => {
    return fetch(`${baseUrlConsultants}consultants`, {
        method: 'GET',
        cors: true
    }).then((response) => response.json())
}