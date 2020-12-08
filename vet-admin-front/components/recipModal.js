import { useState, useEffect } from "react";
import styles from "../styles/doctor/RecipModal.component.module.css";
import { getMedicines } from "../utils/api/medicinApi";
import { getUserFromCookie } from "../utils/auth/userCookies";
import Loading from "./loader";
import { CreateRecip } from "../utils/api/recipApi";
import SuccessfullMessage from "./successfulmessage";
export default function RecipModal(props) {
  const [medicins, setMedicins] = useState([]);
  const [loading, setLoading] = useState("false");
  const [medicineInfo, setMedicineInfo] = useState({});
  const [recipMedicineList, setMedicineList] = useState([]);
  const [messageObject, setMessageObject] = useState({
    messageOpen: false,
    messageText: "",
    messageColor: "",
  });
  const [selectedMed,setSelectedMed] = useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getUserFromCookie()["token"];
        console.log(token);
        setLoading("yes");
        let medicines = await getMedicines(token).then((response) => {
          if (response.status === 200) return response.json();
          return false;
        });
        if (medicines === false) throw new Error("error");
        setMedicins(medicines);
        setLoading("end");
        console.log(medicines);
      } catch (e) {
        setLoading("error");
      }
    };
    fetchData();
  }, []);
  const createRecipHandle = async() => {
    let idarray = recipMedicineList.map((med) => med._id);
    const token = getUserFromCookie()["token"];
    try {
      let obj = {medicines:idarray};
      let data = await CreateRecip(obj,token).then(response=>{
        if(response.status === 200)
          return true;
        return false;
      });
      if(data === false) throw new Error("Error")
      setMessageObject({
        messageOpen: true,
        messageText: "OK, recip created",
        messageColor: "",
      });
      setTimeout(()=>{
        setMessageObject(mess=>({...mess,messageOpen:false}))
        props.reload()
        props.close();
      },1500);
    } catch (e) {
      setMessageObject({
        messageOpen:true,
        messageText:"Problem with recip create",
        messageColor:"lightcoral"
      });
      setTimeout(()=>setMessageObject(mess=>({...mess,messageOpen:false})),1500);
    }
  };
  const medChangeHandle = (event)=>{
    let selected = event.target.value
    console.log(selected)
    setSelectedMed(selected)
    let medinfo = medicins.filter(med=>med.name === selected)[0]
    setMedicineInfo(medinfo)
  }
  if (!props.open) return null;
  return (
    <div className={styles.maincomponent}>
      <SuccessfullMessage
        open={messageObject.messageOpen}
        color={messageObject.messageColor}
        message={messageObject.messageText}
      />
      <header className={styles["maincomponent__header"]}>
        Create recip
        <div
          onClick={() => props.close()}
          className={styles["header__closemodal"]}
        ></div>
      </header>
      {loading === "yes" ? (
        <Loading />
      ) : loading === "end" ? (
        <div className={styles["maincomponent__recip"]}>
          <div className={styles["recip__choice"]}>
            <label>
              Select medicine:
              <select
                className={styles["choice__select"]}
                value={selectedMed}
                onChange={(e) => medChangeHandle(e)}
              >
                {medicins.map((med) => (
                  <option key={med._id} value={med.name}>
                    {med.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {Object.keys(medicineInfo).length > 0 ? (
            <div className={styles["recip__medicineinfo"]}>
              <div className={styles["medicineinfo__doubleinf"]}>
                <div>Name: {medicineInfo.name}</div>
                <div>Producer: {medicineInfo.producer}</div>
              </div>
              <div className={styles["medicineinfo__desc"]}>
                Desc: {medicineInfo.description}
              </div>
              <div className={styles["medicineinfo__doubleinf"]}>
                <div>Type: {medicineInfo.type}</div>
                <div>Unit of packages: {medicineInfo.unit}</div>
              </div>
              <div className={styles["button__group"]}>
                <div
                  onClick={() =>
                    setMedicineList([medicineInfo, ...recipMedicineList])
                  }
                  className={styles["medicineinfo__addbutton"]}
                ></div>
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className={styles["maincomponent__medicinelist"]}>
            <div className={styles["w100"]}>Medicin list:</div>
            <div>
              {[...new Set(recipMedicineList.map((a) => a.name))].map(
                (medname) => (
                  <div className={styles["medicinelist__medicinecomponent"]}>
                    <div className={styles["medicinecomponent__name"]}>
                      {medname}
                    </div>
                    <div>x</div>
                    <div className={styles["medicinecomponent__number"]}>
                      {
                        recipMedicineList.filter((a) => a.name === medname)
                          .length
                      }
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      ) : loading === "error" ? (
        <div>Error</div>
      ) : (
        <div />
      )}
      {recipMedicineList.length > 0 ? (
        <div className={styles["button__recip"]}>
          <button
            onClick={() => createRecipHandle()}
            className={styles["button__recipcreate"]}
          >
            Create recip
          </button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
