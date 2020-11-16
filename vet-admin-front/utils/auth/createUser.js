import firebase from "firebase";
import { createUser } from "../api/userApi";

export const userCreate = async (email, password, userType) => {
  let ifwecanusercreate = await createUser({
    email: email,
    password: password,
    userTYPE: userType,
  }).then((response) => {
    if (response.status === 200) return true;
    return false;
  });
  if (ifwecanusercreate) {
    console.log("Ok");
  }
};
