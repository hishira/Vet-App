import { useState } from "react";
import UserView from "../../index";
import styles from "../../../../styles/UserCreate.module.css";
import YesOrNoDialog from "../../../../components/yesornodialoguser";
import {userCreate} from '../../../../utils/auth/createUser'
export default function CreateUser(props) {
  console.log(props);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("USER");
  const [dialogMode, setDialogMode] = useState(false);
  const [objToDialog, setObjToDialog] = useState({});
  const submithandle = () => {
    event.preventDefault();
    console.log(email, password, userType);
    let obj = {email:email,password:password,userType:userType};
    setDialogMode(true);
    setObjToDialog(obj);
  };
  const closeinchildren = () => {
    setDialogMode(false);
  };
  const createuserchildren = async(user)=>{
    await userCreate(user.email,user.password,user.userType);

  }
  return (
    <div>
      <UserView userdata={props.userdata}>
        <YesOrNoDialog
          handleChange={closeinchildren}
          newuser={objToDialog}
          open={dialogMode}
          message='Are you sure to create user:'
          yeshandle={createuserchildren}
        />
        <div className={styles.createusermaincontainer}>
          <div className={styles.createusermaincontainertitle}>Create user</div>
        </div>
        <form className={styles.createuserform}>
          <label className={styles.emaillabel}>
            Email
            <input
              name="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              className={styles.emailinput}
              type="text"
            />
          </label>
          <label className={styles.passwordlabel}>
            Password
            <input
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.passwordinput}
              type="password"
            />
          </label>
          <label className={styles.choicelabel}>
            User type
            <select
              className={styles.usertypeselect}
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="USER">User</option>
              <option value="DOCTOR">Doctor</option>
              <option value="ADMIN">Admin</option>
            </select>
          </label>
          <button
            className={styles.usercreatesubmitbutton}
            onClick={() => submithandle()}
          >
            Create
          </button>
        </form>
      </UserView>
    </div>
  );
}
