import {getApiLink,GetFetchPostObjectWithAuth} from './configApi';

async function createNote(obj,token=""){
    let url = getApiLink("note/createnote");
    return await fetch(url,GetFetchPostObjectWithAuth(obj,token));
}
async function deleteNote(obj,token=""){
    let url = getApiLink("note/deletenote")
    return await fetch(url,GetFetchPostObjectWithAuth(obj,token));
}
export {createNote,deleteNote}