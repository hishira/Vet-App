import {GetFetchPostObjectWithAuth,getApiLink} from './configApi'

async function getUserInfo(obj,token){
    let url = getApiLink('user/usercreate');
    return fetch(url,GetFetchPostObjectWithAuth(obj,token));
}

export {getUserInfo}