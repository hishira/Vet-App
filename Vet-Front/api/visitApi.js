import {getApiLink,getFetchPostObjectWithAuth,getFetchObjectWithAuth} from './configApi'

async function createVisit(obj,id){
    let url = getApiLink('visit/visitcreate')
    return await fetch(url,getFetchPostObjectWithAuth(obj,id))
}
async function getUserVisits(obj,id){
    let url = getApiLink('visit/uservisits')
    return await fetch(url,getFetchObjectWithAuth(obj,id))
}
async function deleteVisitByID(obj,id){
    let url = getApiLink('visit/deletevisit')
    return await fetch(url,getFetchObjectWithAuth(obj,id))
}
export {
    createVisit,
    getUserVisits,
    deleteVisitByID
}