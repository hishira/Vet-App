import { useState,useEffect } from "react";
import { logout } from "../../utils/auth/loginuser";
import { useRouter } from "next/router";
import styles from "../../styles/User.module.css";
import { getUserInfo } from "../../utils/api/userApi";
import { getUserFromCookie } from "../../utils/auth/userCookies";
import PageLoader from '../../components/loader'
function User({ user }) {
  const [userInfo, setUser] = useState(user);
  const router = useRouter();
  useEffect(()=>{
    console.log(userInfo)
    if(Object.keys(userInfo).length === 0)
      router.push("/")
  },[])
  return (
    <div className={styles.usermaincontainer}>
      {
      Object.keys(userInfo).length === 0?
      (<PageLoader/>):(
      <div>
      <header className={styles.userheader}>
        <button className={styles.logoutbutton} onClick={() => logout(router)}>
          Logout
        </button>
      </header>
      <div className={styles.userinfoCard}>
        <div className={styles.userinfoCardText}>
          <div className={styles.email}>Email: {userInfo.email}</div>
          <div className={styles.accounttype}>
            Account-Type: {userInfo.type}
          </div>
        </div>
      </div>
      </div>)
    }
    </div>
  );
}
User.getInitialProps = async (ctx) => {
  const auth = getUserFromCookie();
  console.log(auth);
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
    user.email = auth["email"];
  }
  return { user: user };
};
export default User;
