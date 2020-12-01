import {getApiLink,GetFetchPostObjectWithAuth} from './configApi';

async function createNote(obj,token=""){
    let url = getApiLink("note/createnote");
    return await fetch(url,GetFetchPostObjectWithAuth(obj,token));
}
export {createNote}