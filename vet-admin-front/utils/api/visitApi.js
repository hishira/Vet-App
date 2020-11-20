import { GetFetchPostObjectWithAuth, getApiLink } from "./configApi";

async function getAllVisits(obj, token = "") {
  let url = getApiLink("visit/getallvisits");
  return await fetch(url, GetFetchPostObjectWithAuth(obj, token));
}
async function getInfoAboutVisit(obj, token = "") {
  let url = getApiLink("visit/visitinfo");
  return await fetch(url, GetFetchPostObjectWithAuth(obj, token));
}
export { getAllVisits, getInfoAboutVisit };
