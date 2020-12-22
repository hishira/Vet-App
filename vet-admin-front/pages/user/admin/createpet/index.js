import { useState, useEffect } from "react";
import UserView from "../../index";
import styles from "../../../../styles/CreatePet.module.css";
import { getAllUsers } from "../../../../utils/api/userApi";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
import Loader from "../../../../components/loader";
import { createPet } from "../../../../utils/api/petApi";
import SuccessfullMessage from "../../../../components/successfulmessage";

export default function CreatePet(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [species, setSpecies] = useState("");
  const [userID, setUserID] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState("false");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const setMessageInformation = (messageText, messageColor, timeout) => {
    setMessageText(messageText);
    setMessageColor(messageColor);
    setMessageOpen(!messageOpen);
    setTimeout(() => setMessageOpen(false), timeout);
  };
  const createPetHandle = async () => {
    let petObj = {
      name: name,
      age: age,
      species: species,
      userID: userID,
    };
    const token = getUserFromCookie()["token"];
    let pet = await createPet(petObj, token).then((response) => {
      if (response.status === 200) return response.json();
      return false;
    });
    if (pet === false) {
      setMessageInformation("Problem with pet create", "lightcoral", 1500);
      
    }else
      setMessageInformation("OK, pet created", "", 1500);
  };
  const prepareAllUserData = async(userToken)=>{
    let usersData = await getAllUsers({}, userToken).then((response) => {
      if (response.status === 200) return response.json();
      return false;
    });
    if (usersData === false) throw new Error("error");
    if (usersData.length !== 0) setUserID(usersData[0]["userID"]);
    setUsers(usersData);
  }
  const fetchUsersData = async () => {
    const token = getUserFromCookie()["token"];
    setLoading("yes");
    try {
      await prepareAllUserData(token);
      setLoading("end");
    } catch (e) {
      setLoading("error");
    }
  };
  useEffect(() => {
    fetchUsersData();
  }, []);
  return (
    <UserView userdata={props.userdata}>
      <SuccessfullMessage
        open={messageOpen}
        color={messageColor}
        message={messageText}
      />
      <div className={styles.maincomponent}>
        <div className={styles.petcreateform}>
          <div>
            <label className={styles.namelabel}>
              Name:
              <input
                className={styles.nameinput}
                placeholder="Name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className={styles.agelabel}>
              <div>Age:</div>
              <input
                className={styles.ageinput}
                placeholder="0"
                type="number"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className={styles.selectlabel}>
              <div>Species</div>
              <select
                className={styles.petselect}
                value={species}
                onChange={(e) => setSpecies(e.target.value)}
              >
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Parrot">Parrot</option>
                <option value="Hamster">Hamster</option>
                <option value="Guinea Pig">Guinea Pig</option>
              </select>
            </label>
          </div>
          {loading === "yes" ? (
            <Loader />
          ) : loading === "end" ? (
            <div>
              <label className={styles.userlabel}>
                <div>User:</div>
                <select
                  className={styles.userselect}
                  value={userID}
                  onChange={(e) => setUserID(e.target.value)}
                >
                  {users.map((user) => (
                    <option value={user.userID}>{user.email}</option>
                  ))}
                </select>
              </label>
            </div>
          ) : loading === "error" ? (
            <div>Error</div>
          ) : (
            <div />
          )}
          <button
            className={styles.createpetbutton}
            onClick={() => createPetHandle()}
          >
            Create pet
          </button>
        </div>
      </div>
    </UserView>
  );
}
