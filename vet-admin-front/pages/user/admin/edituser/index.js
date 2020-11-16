import { useState, useEffect } from "react";
import UserView from "../../index";
import styles from "../../../../styles/UserEdit.module.css";
import { getAllUsers } from "../../../../utils/api/userApi";
import Loader from "../../../../components/loader";
import {useRouter} from 'next/router'
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
export default function EditUser(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState("false");
  const router = useRouter() 
  useEffect(() => {
    let fetchdata = async () => {
      const userCookies = getUserFromCookie();
      setLoading("yes");
      try {
        let data = await getAllUsers({}, userCookies["token"]).then(
          (response) => {
            if (response.status === 200) return response.json();
            return flase;
          }
        );
        if (data === false) throw new Error("error");
        setLoading("end");
        setUsers(data);
        prepareCanvas();
      } catch (e) {
        setLoading("Error");
      }
    };
    fetchdata();
  }, []);
  const prepareCanvas = () => {
    const canvas = document.querySelector("canvas");
    let sort = { USER: 0, ADMIN: 0, DOCTOR: 0 };
    console.log(users)
    for (let i of users) {
      if (i.type === "USER") sort["USER"] += 1;
      if (i.type === "ADMIN") sort["ADMIN"] += 1;
      if (i.type === "DOCTOR") sort["DOCTOR"] += 1;
    }
    console.log(sort);
    let ctx = canvas.getContext("2d");
    const colors = ["#a6335f", "#e194bc", "#a5545d"];
    const width = (canvas.width - 10) / 2;
    const height = (canvas.height - 10) / 2;
    let end = 0;

    for (let i = 0; i < Object.keys(sort).length; i++) {
      ctx.fillStyle = colors[i];
      ctx.strokeStyle = "white";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width, height);
      let firsdata = (sort[Object.keys(sort)[i]] / users.length) * 2 * Math.PI;
      let r = height - 10 / 2;
      ctx.arc(width, height, r, end, end + firsdata, false);
      ctx.lineTo(width, height);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "white";
      ctx.font = "15px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let mid = end + firsdata / 2;
      console.log(r);
      ctx.fillText(
        Object.keys(sort)[i],
        width + Math.cos(mid) * (r / 2),
        height + Math.sin(mid) * (r / 2)
      );
      end += Math.PI * 2 * (sort[Object.keys(sort)[i]] / users.length);
    }
  };
  return (
    <div>
      <UserView userdata={props.userdata}>
        {loading === "yes" ? (
          <Loader />
        ) : loading === "end" ? (
          <div className={styles.usereditmaincontainer}>
            <div className={styles.userschart}>
            <canvas style={{zIndex:"120310230"}} width="200" height="200"></canvas>
            </div>
            <div className={styles.userscontainer}>
                {
                    users.map(user=><div key={user._id} className={styles.user}></div>)
                }
            </div>
          </div>
        ) : loading === "Error" ? (
          <div>Error</div>
        ) : (
          <div />
        )}
      </UserView>
    </div>
  );
}
