const baseUrlResidential = 'https://www.gvrecrm.com/';
const newBaseUrlResidential = 'https://api.vamosaporello.com/';

const requestBaseParams = { method: 'GET', cors: true };


export const getResidential = (filters = {}) => {
  const filterQueryParams = new URLSearchParams(filters);
  const urlWithFilters = filterQueryParams ? `${newBaseUrlResidential}ads?${filterQueryParams}` : `${newBaseUrlResidential}ads`;
  
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