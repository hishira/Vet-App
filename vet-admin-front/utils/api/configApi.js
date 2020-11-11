const fetchObject = {
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  credentials: "include",
  method: "GET",
};
function GetFetchPostObjectWithAuth(obj, id) {
  return {
    mode: "cors",
    headers: {
      Authorization: `Bearer ${id}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify(obj),
  };
}
function getApiLink(str){
    let url = `http://localhost:9000/${str}`;
    return url;
}
export {fetchObject,GetFetchPostObjectWithAuth,getApiLink}
