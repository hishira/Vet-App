import {getApiLink,getFetchPostObject} from './configApi'

async function getClinicByCity(obj){
    let url = getApiLink("clinic/clinicsbycity")
    return await fetch(url,getFetchPostObject(obj))
}
export{
    getClinicByCity
}