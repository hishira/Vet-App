import {GetFetchPostObjectWithAuth,getApiLink} from './configApi'

async function getUserInfo(obj,token){
    let url = getApiLink('user/getuserinfo');
    return fetch(url,GetFetchPostObjectWithAuth(obj,token));
}
async function createUser(obj,token=""){
    let url = getApiLink("user/usercreate");
    return await fetch(url,GetFetchPostObjectWithAuth(obj,token))
}
export {getUserInfo,createUser}