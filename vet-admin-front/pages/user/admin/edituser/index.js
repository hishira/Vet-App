import { useState, useEffect } from "react";
import UserView from "../../index";
import styles from "../../../../styles/UserEdit.module.css";
import { getAllUsers } from "../../../../utils/api/userApi";
import Loader from "../../../../components/loader";
import { useRouter } from "next/router";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
import EditUserModal from "../../../../components/EditUserModal";
export default function EditUser(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState("false");
  const [userEdit, setUserEdit] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [pageReaload,setPageReload] = useState(false)
  const router = useRouter();
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
        setUsers(data);
        setLoading("end");
        console.log("Dataddd", data);
        prepareCanvas(data);
      } catch (e) {
        setLoading("Error");
      }
    };
    fetchdata();
  }, [pageReaload]);
  const realoadPage = ()=>{
    setPageReload(!pageReaload);
  }
  const editUsertHandle = (user) => {
    setUserEdit(user);
    setOpenDialog(true);
  };
  const handleCloseModal = () => {
    setOpenDialog(false);
  };
  const prepareCanvas = (users) => {
    const canvas = document.querySelector("canvas");
    let sort = { USER: 0, ADMIN: 0, DOCTOR: 0 };
    console.log(users);
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
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      let mid = end + firsdata / 2;
      console.log(r);
      ctx.fillText(
        `${Object.keys(sort)[i]}: ${sort[Object.keys(sort)[i]]}`,
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
          <div
            onLoad={() => prepareCanvas()}
            className={styles.usereditmaincontainer}
          >
            <EditUserModal
              closeModal={handleCloseModal}
              open={openDialog}
              useredit={userEdit}
              reload={realoadPage}
            />
            <div className={styles.userschart}>
              <canvas width="200" height="200"></canvas>
              <div>User stats on chart</div>
            </div>
            <div className={styles.userscontainer}>
              {users.map((user) => (
                <div key={user._id} className={styles.user}>
                  <div className={styles.useremail}>Email: {user.email}</div>
                  <div className={styles.buttongroup}>
                    <button
                      className={styles.emailbutton}
                      onClick={() => editUsertHandle(user)}
                    >
                      User edit
                    </button>
                  </div>
                </div>
              ))}
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
