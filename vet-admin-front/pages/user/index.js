import { useState, useEffect } from "react";
import { logout } from "../../utils/auth/loginuser";
import { useRouter } from "next/router";
import styles from "../../styles/User.module.css";
import { getUserInfo } from "../../utils/api/userApi";
import { getUserFromCookie } from "../../utils/auth/userCookies";
import PageLoader from "../../components/loader";
function User({ user }) {
  const [userInfo, setUser] = useState(user);
  const router = useRouter();
  useEffect(() => {
    console.log(userInfo);
    let elements = document.getElementsByClassName(styles.usersubmenu);
    for (let i of elements) {
      console.log(i);
      i.flag = false;
    }
    let menuelement = document.getElementsByClassName(styles.menubutton);
    for (let i of menuelement) i.flag = false;
    if (Object.keys(userInfo).length === 0) router.push("/");
  }, []);
  const onMenuClick = () => {
    let element = document.getElementsByClassName(styles.usersubmenu)[0];
    if (element.flag === false) {
      element.style.display = "block";
      let counter = 200;
      for(let i of element.children){
        console.log(i.classList)
        setTimeout(()=>i.classList.add(styles.usersubelementnanimation),counter);
        counter+=100
      }
    }
    else{
      element.style.display = "none";
    }
    element.flag = !element.flag;
  };
  const onMenuButtonClick = () => {
    let menuelement = document.getElementsByClassName(styles.menu)[0];
    if (!menuelement.flag) {
      menuelement.classList.remove(styles.menuclassanimationnext);
      menuelement.classList.add(styles.menuclassanimation);
    } else {
      menuelement.classList.remove(styles.menuclassanimation);
      menuelement.classList.add(styles.menuclassanimationnext);
    }
    menuelement.flag = !menuelement.flag;
  };
  return (
    <div className={styles.usermaincontainer}>
      {Object.keys(userInfo).length === 0 ? (
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
              <li className={styles.menuchild} onClick={() => onMenuClick()}>
                User
                
              </li>
              <ul className={styles.usersubmenu}>
                  <li>Create user</li>
                  <li>Edit user</li>
                  <li>Delete user</li>
                </ul>
              <li className={styles.menuchild}>Visits</li>
            </ul>
          </div>
          <div className={styles.userinfoCard}>
            <div className={styles.userinfoCardText}>
              <div className={styles.email}>Email: {userInfo.email}</div>
              <div className={styles.accounttype}>
                Account-Type: {userInfo.type}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
User.getInitialProps = async (ctx) => {
  const auth = getUserFromCookie();
  console.log(typeof auth);
  let user = {};
  if (typeof auth === "object") {
    let obj = {
      userID: auth["id"],
    };
    user = await getUserInfo(obj, auth["token"]).then((response) => {
      if (response.status === 200) return response.json();
      return false;
    });
    user = user[0];
    console.log(user);
    if (user !== false) user["email"] = auth["email"];
  }
  return { user: user };
};
export default User;
