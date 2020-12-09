import {GetFetchPostObjectWithAuth,getApiLink} from './configApi'

async function CreateRecip(obj,token=""){
    let url = getApiLink("recip/recipcreate");
    return await fetch(url,GetFetchPostObjectWithAuth(obj,token));
}
async function GetRecipByVisit(obj,token=""){
    let url = getApiLink("recip/getbyvisit");
    return await fetch(url,GetFetchPostObjectWithAuth(obj,token));
}
export {CreateRecip,GetRecipByVisit}