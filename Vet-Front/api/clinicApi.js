import {getApiLink,getFetchPostObject,fetchObject} from './configApi'

async function getClinicByCity(obj){
    let url = getApiLink("clinic/clinicsbycity")
    return await fetch(url,getFetchPostObject(obj))
}
async function getAllClinics(){
    let url = getApiLink("clinic/getallclinic")
    return await fetch(url,fetchObject)
}
export{
    getClinicByCity,
    getAllClinics
}