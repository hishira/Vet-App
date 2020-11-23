import { useState, useEffect } from "react";
import { logout } from "../../utils/auth/loginuser";
import { useRouter } from "next/router";
import styles from "../../styles/User.module.css";
import PageLoader from "../../components/loader";

function User(props) {
  const [userInfo, setUser] = useState(props.userdata);
  const router = useRouter();
  useEffect(() => {
    let elements = document.getElementsByClassName(styles.usersubmenu);
    for (let i of elements) {
      i.flag = false;
    }
    let menuelement = document.getElementsByClassName(styles.menubutton);
    for (let i of menuelement) i.flag = false;
    if (Object.keys(userInfo).length === 0) router.push("/");
  }, []);
  const addAndRemoveClass = (element, classtoadd, classtoremove) => {
    element.classList.remove(classtoremove);
    element.classList.add(classtoadd);
  };
  const onMenuClick = (conter) => {
    let element = document.getElementsByClassName(styles.usersubmenu)[conter];
    let counter = 100;
    if (element.flag === false) {
      setTimeout(() => (element.style.display = "block"), counter);
      for (let i of element.children) {
        setTimeout(() => {
          addAndRemoveClass(
            i,
            styles.usersubelementnanimation,
            styles.usersubelementnanimationoff
          );
        }, counter);
        counter += 300;
      }
    } else {
      for (let i = element.children.length - 1; i >= 0; i--) {
        setTimeout(() => {
          addAndRemoveClass(
            element.children[i],
            styles.usersubelementnanimationoff,
            styles.usersubelementnanimation
          );
        }, counter);
        counter += 300;
      }
      setTimeout(() => (element.style.display = "none"), counter);
    }
    element.flag = !element.flag;
  };
  const onMenuButtonClick = () => {
    let menuelement = document.getElementsByClassName(styles.menu)[0];
    if (!menuelement.flag) {
      addAndRemoveClass(
        menuelement,
        styles.menuclassanimation,
        styles.menuclassanimationnext
      );
    } else {
      addAndRemoveClass(
        menuelement,
        styles.menuclassanimationnext,
        styles.menuclassanimation
      );
    }
    menuelement.flag = !menuelement.flag;
  };
  return (
    <div className={styles.usermaincontainer}>
      {Object.keys(userInfo ? userInfo : []).length === 0 ? (
        <PageLoader />
      ) : (
        <div>
          <header className={styles.userheader}>
            <button
              onClick={() => onMenuButtonClick()}
              className={styles.menubutton}
            >
              Menu
            </button>
            <button
              className={styles.logoutbutton}
              onClick={() => logout(router)}
            >
              Logout
            </button>
          </header>
          <div>
            <ul className={styles.menu}>
              {userInfo.type === "ADMIN" ? (
                <div>
                  <li
                    className={styles.menuchild}
                    onClick={() => onMenuClick(0)}
                  >
                    User
                  </li>
                  <ul className={styles.usersubmenu}>
                    <li
                      className={styles.lielement}
                      onClick={() => router.push("/user/admin/createuser")}
                    >
                      Create user
                    </li>
                    <li
                      className={styles.lielement}
                      onClick={() => router.push("/user/admin/edituser")}
                    >
                      Edit users
                    </li>
                    <li className={styles.lielement}>Delete user</li>
                  </ul>
                </div>
              ) : (
                <div />
              )}
              <li className={styles.menuchild} onClick={() => onMenuClick(1)}>
                Visits
              </li>
              <ul className={styles.usersubmenu}>
                <li
                  className={styles.lielement}
                  onClick={() => router.push("/user/admin/allvisits")}
                >
                  See all visits
                </li>
              </ul>
              <li className={styles.menuchild} onClick={() => onMenuClick(2)}>
                Pets
              </li>
              <ul className={styles.usersubmenu}>
                <li
                  className={styles.lielement}
                  onClick={() => router.push("/user/admin/allpets")}
                >
                  All pets
                </li>
              </ul>
            </ul>
          </div>
          <div className={styles.usercardbackground}>
          <div className={styles.userinfoCard}>
            <div className={styles.userinfoCardText}>
              <div className={styles.email}>Email: {userInfo.email}</div>
              <div className={styles.accounttype}>
                Account-Type: {userInfo.type}
              </div>
            </div>
          </div>
          </div>
        </div>
      )}
      {props.children}
    </div>
  );
}

export default User;
