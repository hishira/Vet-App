import { useState } from "react";
import styles from "../styles/EditUserModal.components.module.css";
import {changeUserEmail,changeUserPassword} from "../utils/api/userApi";
import {getUserFromCookie} from '../utils/auth/userCookies'
export default function EditUserModal(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeEmail = async () => {
    let obj = {
      uid: props.useredit.userID,
      email: email,
      userID: props.useredit._id,
    };
    let token = getUserFromCookie()["token"];
    console.log(obj,token);
    let resp = await changeUserEmail(obj,token).then(response=>{
      if(response.status === 200)
        return true;
      return false;
    })
    if(resp){
      closeHandle();
      return;
    }
    console.log("Something goes wrong while email changing");

  };
  const changePassword = async () => {
    let obj={
      uid: props.useredit.userID,
      password: password,
    };
    let token = getUserFromCookie()["token"];
    let resp = await changeUserPassword(obj,token).then(response=>{
      if(response.status === 200)
        return true;
      return false;
    });
    if(resp){
      closeHandle();
      return;
    }
    console.log("Something goes wrong")
  };
  const closeHandle = () => {
    setEmail("");
    setPassword("");
    props.closeModal();
  };
  return (
    <div>
      {props.open ? (
        <div className={styles.modal}>
          <div className={styles.modalheader}>
            <div
              className={styles.modalclose}
              onClick={() => closeHandle()}
            ></div>
          </div>
          <div className={styles.modaltitle}>Edit user</div>
          <div className={styles.editoptions}>
            <label className={styles.emailform}>
              Email:
              <input
                className={styles.emailinput}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <button
                className={styles.changebutton}
                onClick={() => changeEmail()}
              >
                Change
              </button>
            </label>
            <label className={styles.passwordform}>
              Password:
              <input
                className={styles.passwordinput}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <button
                className={styles.changebutton}
                onClick={() => changePassword()}
              >
                Change
              </button>
            </label>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
