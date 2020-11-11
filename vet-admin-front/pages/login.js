import { useState } from "react";
import style from "../styles/Login.module.css";
import { useRouter } from "next/router";
import { loginuser } from "../utils/auth/loginuser";
import {BadLoginMessage} from '../components/badloginmessage'
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageFlag,setMessageFlag] = useState(false)
  const router = useRouter();
  const loginHandle = async () => {
    let documentelement = document.getElementsByClassName(style.loginButton)[0];
    documentelement.classList.add(style.loginbuttonanimate);
    setTimeout(
      () => documentelement.classList.remove(style.loginbuttonanimate),
      800
    );
    console.log(email, password);
    let k = await loginuser(email, password);
    if(k){
        router.push("/user");
    }else{
      setMessageFlag(true)
      setTimeout(()=>setMessageFlag(false),1000);
    }
  };
  return (
    <div className={style.maincontainer}>
      <BadLoginMessage show={messageFlag}/>
      <main className={style.maincontent}>
        <p className={style["maincontent-title"]}>Login</p>
        <div className={style.inputcontainer}>
          <label className={style.labelclass}>Email:</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className={style.inputclass}
          />
          <label className={style.labelclass}>Password:</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className={style.inputclass}
          />
        </div>
        <div className={style.buttoncontainer}>
          <button className={style.loginButton} onClick={() => loginHandle()}>
            Login
          </button>
        </div>
      </main>
    </div>
  );
}
