import { useState, useEffect } from "react";
import styles from "../styles/doctor/RecipModal.component.module.css";
import { getMedicines } from "../utils/api/medicinApi";
import { getUserFromCookie } from "../utils/auth/userCookies";
import Loading from "./loader";
export default function RecipModal(props) {
  const [medicins, setMedicins] = useState([]);
  const [loading, setLoading] = useState("false");
  const [medicineInfo, setMedicineInfo] = useState({});
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
  if (!props.open) return null;
  return (
    <div className={styles.maincomponent}>
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
                value={medicineInfo.name}
                onChange={(e) => setMedicineInfo(JSON.parse(e.target.value))}
              >
                {medicins.map((med) => (
                  <option key={med._id} value={JSON.stringify(med)}>
                    {med.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          {Object.keys(medicineInfo).length !== 0 ? (
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
            </div>
          ) : (
            <div />
          )}
        </div>
      ) : loading === "error" ? (
        <div>Error</div>
      ) : (
        <div />
      )}
    </div>
  );
}
