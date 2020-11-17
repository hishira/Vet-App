import { useState } from "react";
import styles from "../styles/EditUserModal.components.module.css";
export default function EditUserModal(props) {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const changeEmail = ()=>{
    console.log(props.useredit._id,email)
  }
  const changePassword = ()=>{
    console.log(props.useredit._id,password)
  }
  const closeHandle = ()=>{
    setEmail("");
    setPassword("");
    props.closeModal()
  }
    return (
    <div>
      {props.open ? (
        <div className={styles.modal}>
          <div className={styles.modalheader}>
            <div className={styles.modalclose} onClick={()=>closeHandle()}></div>
          </div>
          <div className={styles.modaltitle}>Edit user</div>
            <div className={styles.editoptions}>
                <label className={styles.emailform}>
                    Email:
                    <input className={styles.emailinput} onChange={(e)=>setEmail(e.target.value)} type='email'/>
                    <button className={styles.changebutton} onClick={()=>changeEmail()}>Change</button>
                </label>
                <label className={styles.passwordform}>
                    Password: 
                    <input className={styles.passwordinput} onChange={(e)=>setPassword(e.target.value)} type='password'/>
                    <button className={styles.changebutton} onClick={()=>changePassword()}>Change</button>
                </label>
            </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
