import {GetFetchGetObjectWithAuth,getApiLink} from "./configApi"
async function getMedicines(token){
    let url = getApiLink("medicine/getall")
    return await fetch(url,GetFetchGetObjectWithAuth(token));
}
export {getMedicines}