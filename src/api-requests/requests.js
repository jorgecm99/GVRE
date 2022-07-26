const baseUrlResidential = 'https://www.gvrecrm.com/';
const newBaseUrlResidential = 'https://api.vamosaporello.com/ads/web/department=Residencial&showOnWeb=true';
const newBaseUrlPatrimonial = 'https://api.vamosaporello.com/ads/web/department=Patrimonio&showOnWeb=true';

const requestBaseParams = { method: 'GET', cors: true };


export const getResidential = (filters ) => {
    let filterParams = ''
    new URLSearchParams(filters).forEach((value, key) => {
      filterParams = `${filterParams}&${key}=${value}`
})
  
  const urlWithFilters = filterParams ? `${newBaseUrlResidential}${filterParams}` : `${newBaseUrlResidential}`;
  
  return fetch(urlWithFilters, requestBaseParams).then(response => response.json())
}

export const getPatrimonial = (filters ) => {
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