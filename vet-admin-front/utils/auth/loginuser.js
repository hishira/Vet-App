import firebase from "firebase/app";
import "firebase/auth";
import {initFirebase} from "./initFirebase";
import {removeUserCookie} from '../auth/userCookies'
initFirebase();
export const loginuser = async (email, password) => {
    let ifok = true
    await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch((err) => {
        ifok = false
      console.log(err.message);
    });
    return ifok;
};
export const islogin = async () => {
  let k = await firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user) return true;
    return false;
  });
  return k;
};
export const logout = async(router)=>{
  
  return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/login");
        removeUserCookie();
      })
      .catch((e) => console.error(e));
}
