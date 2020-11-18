import { GetFetchPostObjectWithAuth, getApiLink } from "./configApi";

async function getUserInfo(obj, token) {
  let url = getApiLink("user/getuserinfo");
  return fetch(url, GetFetchPostObjectWithAuth(obj, token));
}
async function createUser(obj, token = "") {
  let url = getApiLink("user/usercreate");
  return await fetch(url, GetFetchPostObjectWithAuth(obj, token));
}
async function getAllUsers(obj, token = "") {
  let url = getApiLink("user/getusers");
  return await fetch(url, GetFetchPostObjectWithAuth(obj, token));
}
async function changeUserEmail(obj, token = "") {
  let url = getApiLink("user/updateemail");
  return await fetch(url, GetFetchPostObjectWithAuth(obj, token));
}
async function changeUserPassword(obj, token) {
  let url = getApiLink("user/updatepassword");
  return await fetch(url, GetFetchPostObjectWithAuth(obj, token));
}
export {
  getUserInfo,
  createUser,
  getAllUsers,
  changeUserEmail,
  changeUserPassword,
};
