import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import { mapUserData } from "./mapUserData";
import {
  getUserFromCookie,
  removeUserCookie,
  setUserCookie,
} from "./userCookies";
import {initFirebase} from "./initFirebase";
initFirebase();
const useUser = (store) => {
  const [user, setUser] = useState();
  const router = useRouter();
  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        router.push("/login");
      })
      .catch((e) => console.error(e));
  };
  useEffect(() => {
    const cancelAuthListener = firebase
      .auth()
      .onIdTokenChanged(async (user) => {
        if (user) {
          const userData = await mapUserData(user);
          setUserCookie(userData);
          //store.setLoggedStatus(true)
          setUser(userData);
        } else {
          removeUserCookie();
          setUser();
          //store.setLoggedStatus(false)
        }
      });
    const userFromCookie = getUserFromCookie();
    
    setUser(userFromCookie);
    return () => {
      cancelAuthListener();
    };
  }, []);
  return { user, logout };
};
export { useUser };
