import {getApiLink,getFetchObjectWithAuth,getFetchPostObjectWithAuth} from './configApi'

async function addPet(obj,id){
    let url = getApiLink('pet/registerpet')
    return await fetch(url,getFetchPostObjectWithAuth(obj,id))
}
async function getUserPets(obj,id){
    let url = getApiLink(`pet/userpets`)
    return await fetch(url,getFetchPostObjectWithAuth(obj,id))
}
async function deletePet(obj,id){
    let url = getApiLink("pet/deletepet");
    return await fetch(url,getFetchPostObjectWithAuth(obj,id))
}
export{
    addPet,
    getUserPets,
    deletePet
}