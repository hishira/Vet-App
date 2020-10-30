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
const fetchDeleteObject = {
  mode: "cors",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
  credentials: "include",
  method: "DELETE",
};
function getFetchPostObjectWithAuth(obj, id) {
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
function getFetchObjectWithAuth(obj, id) {
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
function getDeleteFetchObject(obj) {
  return {
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "http://   :3000",
    },
    credentials: "include",
    method: "DELETE",
    body: JSON.stringify(obj),
  };
}

function getApiLink(str) {
  let url = `https://356bb259d28f.ngrok.io/${str}`;
  return url;
}
function getFetchPostObject(obj) {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "POST",
    body: JSON.stringify(obj),
  };
}
function getFetchPutObject(obj) {
  return {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "PUT",
    body: JSON.stringify(obj),
  };
}

export {
  fetchObject,
  getFetchPostObject,
  getApiLink,
  getFetchPutObject,
  fetchDeleteObject,
  getDeleteFetchObject,
  getFetchPostObjectWithAuth,
  getFetchObjectWithAuth
};
