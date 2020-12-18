import {getApiLink,getFetchPostObjectWithAuth} from './configApi'

async function getNoteByVisit(obj,id){
    let url = getApiLink("note/getbyvisit");
    return await fetch(url,getFetchPostObjectWithAuth(obj,id))
}

export {
    getNoteByVisit
}