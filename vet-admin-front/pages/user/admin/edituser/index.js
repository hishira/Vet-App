import { useState, useEffect } from "react";
import UserView from "../../index";
import styles from "../../../../styles/UserEdit.module.css";
import { getAllUsers } from "../../../../utils/api/userApi";
import Loader from "../../../../components/loader";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
export default function EditUser(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState("false");
  useEffect(() => {
    let fetchdata = async () => {
      const userCookies = getUserFromCookie();
      setLoading("yes");
      try {
        let data = await getAllUsers({}, userCookies["token"]).then((response) => {
          if (response.status === 200) return response.json();
          return flase;
        });
        if (data === false) throw new Error("error");
        setLoading("end");
        console.log(data)
        setUsers(data);
        prepareCanvas();
      } catch (e) {
          setLoading("Error");
      }
    };
    fetchdata();  
  },[]);
  const prepareCanvas = ()=>{
    
  }
  return (
    <div>
      <UserView userdata={props.userdata}>
        {
        loading === "yes"?(<Loader/>):loading === "end"?(
        <div className={styles.usereditmaincontainer}>
          Dupa
          <canvas id="canvaschart"></canvas>
        </div>):loading === "Error"?(<div>Error</div>):(<div/>)
        }
      </UserView>
    </div>
  );
}
