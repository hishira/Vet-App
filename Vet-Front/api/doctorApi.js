import {getApiLink,getFetchPostObject,fetchObject} from './configApi'

async function getDoctorsbyClinic(obj){
    let url = getApiLink("doctor/doctorsbyclinic")
    return await fetch(url,getFetchPostObject(obj))
}
export{
    getDoctorsbyClinic
}