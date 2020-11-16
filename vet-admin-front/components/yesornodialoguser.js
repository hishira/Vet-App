import React, { useState } from "react";
import styles from "../styles/yesornodialog.components.module.css";
import {userCreate} from '../utils/auth/createUser'
export default function YesOrNoDialog(props) {
  const handleclose = () => {
    props.handleChange();
  };
  const yeshandle = async() => {
    console.log(props.newuser);
    await userCreate(props.newuser.email,props.newuser.password,props.newuser.userType);

    handleclose();

  };
  return (
    <div>
      {props.open ? (
        <div className={styles.maincomponent}>
          <div className={styles.maintext}>Are you sure to create user:</div>
          <div className={styles.buttongroup}>
            <button onClick={() => yeshandle()} className={styles.buttonstyle}>
              Yes
            </button>
            <button
              onClick={() => handleclose()}
              className={styles.buttonstyle}
            >
              No
            </button>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
