import { GetFetchPostObjectWithAuth, getApiLink } from "./configApi";

async function getAllVisits(obj, token = "") {
  let url = getApiLink("visit/getallvisits");
  return await fetch(url, GetFetchPostObjectWithAuth(obj, token));
}
export { getAllVisits };
