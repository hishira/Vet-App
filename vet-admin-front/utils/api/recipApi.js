import {GetFetchPostObjectWithAuth,getApiLink} from './configApi'

async function CreateRecip(obj,token=""){
    let url = getApiLink("recip/recipcreate");
    return await fetch(url,GetFetchPostObjectWithAuth(obj,token));
}
export {CreateRecip}