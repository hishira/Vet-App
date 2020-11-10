import {useState} from 'react'
import style from '../styles/Login.module.css'

export default function Login(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const loginHandle = ()=>{
        let documentelement = document.getElementsByClassName(style.loginButton)[0];
        documentelement.classList.add(style.loginbuttonanimate)
        setTimeout(()=>
            documentelement.classList.remove(style.loginbuttonanimate)
        ,800)
        console.log(email,password);
    }
    return<div className={style.maincontainer}>
        <main className={style.maincontent}>
            <p className={style['maincontent-title']}>
                    Login
            </p>
            <div className={style.inputcontainer}>
                <label  className={style.labelclass} >Email:</label>
                <input onChange ={(e)=>setEmail(e.target.value)} type='text' className={style.inputclass}/>
                <label className={style.labelclass} >Password:</label>
                <input onChange={(e)=>setPassword(e.target.value)}  type='password' className={style.inputclass}/>
            </div>
            <div className={style.buttoncontainer}>
            <button className={style.loginButton} onClick={()=> loginHandle()}>Login</button>
            </div>
        </main>
    </div>
}