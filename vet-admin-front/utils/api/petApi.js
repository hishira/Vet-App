import { GetFetchPostObjectWithAuth, getApiLink } from "./configApi";

async function getPetBySpecies(obj, token = "") {
  let url = getApiLink("pet/getpetbyspecies");
  return await fetch(url, GetFetchPostObjectWithAuth(obj, token));
}
async function deletePet(obj,token=""){
  let url = getApiLink("pet/deletepet");
  return await fetch(url,GetFetchPostObjectWithAuth(obj,token));
}
export { getPetBySpecies,deletePet };
