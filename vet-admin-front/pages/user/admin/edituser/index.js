import { useState, useEffect } from "react";
import UserView from "../../index";
import styles from "../../../../styles/UserEdit.module.css";
import { getAllUsers } from "../../../../utils/api/userApi";
import Loader from "../../../../components/loader";
import { useRouter } from "next/router";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
import EditUserModal from "../../../../components/EditUserModal";
import YesOrNoDialog from "../../../../components/yesornodialoguser";
import { deleteUser } from "../../../../utils/api/userApi";
export default function EditUser(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState("false");
  const [userEdit, setUserEdit] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [pageReaload, setPageReload] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState({});
  const router = useRouter();
  const getUsers = async (usertoken)=>{
    let objecttosend = {};
    let users = await getAllUsers(objecttosend, usertoken).then(
      (response) => {
        if (response.status === 200) return response.json();
        return flase;
      }
    );
    if (users === false) throw new Error("error");
    return users;
  }
  useEffect(() => {
    let fetchdata = async () => {
      const usertoken = getUserFromCookie().token;
      setLoading("yes");
      try {
        let users = await getUsers(usertoken);
        setUsers(users);
        setLoading("end");
        prepareCanvas(users);
      } catch (e) {
        setLoading("Error");
      }
    };
    fetchdata();
  }, [pageReaload]);
  const realoadPage = () => {
    setPageReload(!pageReaload);
  };
  const editUsertHandle = (user) => {
    setUserEdit(user);
    setOpenDialog(true);
  };
  const handleCloseModal = () => {
    setOpenDialog(false);
  };
  const closeDeleteDialog = () => {
    setDeleteDialogOpen(!deleteDialogOpen);
  };
  const deleteUserHandle = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(!deleteDialogOpen);
  };
  const yesDialogHandle = async (user) => {
    let obj = { uid: user.userID, userID: user._id };
    console.log(obj);
    const token = getUserFromCookie()["token"];
    let data = await deleteUser(obj, token).then((response) => {
      if (response.status === 200) return true;
      return false;
    });
    if (data) {
      console.log("OK OK OK");
      setPageReload(!pageReaload);
    }
  };
  const prepareUserData = (sorteduserobject, usersarray) => {
    for (let i of usersarray) {
      if (i.type === "USER") sorteduserobject.USER += 1;
      if (i.type === "ADMIN") sorteduserobject.ADMIN += 1;
      if (i.type === "DOCTOR") sorteduserobject.DOCTOR += 1;
    }
  };
  const prepareCanvasObject = (canvasObject) => {
    let ctx = canvasObject.getContext("2d");
    const colors = ["#a6335f", "#e194bc", "#a5545d"];
    const width = (canvasObject.width - 10) / 2;
    const height = (canvasObject.height - 10) / 2;
    return { context: ctx, width: width, height: height, canvascolors: colors };
  };
  const beginDrawingOnCanvas = (canvasObject, colornumber) => {
    canvasObject.context.fillStyle = canvasObject.canvascolors[colornumber];
    canvasObject.context.strokeStyle = "white";
    canvasObject.context.lineWidth = 2;
    canvasObject.context.beginPath();
    canvasObject.context.moveTo(canvasObject.width, canvasObject.height);
  };
  const drawSectionOfChart = (canvasObject, chartradius, end, firstdata) => {
    canvasObject.context.arc(
      canvasObject.width,
      canvasObject.height,
      chartradius,
      end,
      end + firstdata,
      false
    );
    canvasObject.context.lineTo(canvasObject.width,canvasObject.height)
    canvasObject.context.fill()
    canvasObject.context.stroke()
    canvasObject.context.fillStyle = "white";
    canvasObject.context.font = "12px Arial";
    canvasObject.context.textAlign = "center";
    canvasObject.context.textBaseline = "middle";
  };

  const prepareCanvas = (users) => {
    const canvas = document.querySelector("canvas");
    let sort = { USER: 0, ADMIN: 0, DOCTOR: 0 };
    prepareUserData(sort, users);
    let end = 0;
    const canvasObject = prepareCanvasObject(canvas);
    for (let i = 0; i < Object.keys(sort).length; i++) {
      beginDrawingOnCanvas(canvasObject,i);
      let firsdata = (sort[Object.keys(sort)[i]] / users.length) * 2 * Math.PI;
      let r = canvasObject.height - 10 / 2;
      drawSectionOfChart(canvasObject,r,end,firsdata);
      let mid = end + firsdata / 2;
      canvasObject.context.fillText(
        `${Object.keys(sort)[i]}: ${sort[Object.keys(sort)[i]]}`,
        canvasObject.width + Math.cos(mid) * (r / 2),
        canvasObject.height + Math.sin(mid) * (r / 2)
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
            <YesOrNoDialog
              handleChange={closeDeleteDialog}
              newuser={userToDelete}
              open={deleteDialogOpen}
              message="Are you sure to delete user:"
              yeshandle={yesDialogHandle}
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
                    <button
                      className={styles.deletebutton}
                      onClick={() => deleteUserHandle(user)}
                    >
                      Delete user
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
