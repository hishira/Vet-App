import { useState, useEffect } from "react";
import UserView from "../../index";
import styles from "../../../../styles/doctor/AllVisits.module.css";
import {
  getAllVisits,
  getVisitsByDoctor,
} from "../../../../utils/api/visitApi";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
import Loader from "../../../../components/loader";
import { useRouter } from "next/router";
export default function DoctorAllVisits(props) {
  const [loading, setLoading] = useState("false");
  const [visits, setVisits] = useState([]);
  const router = useRouter();

  const getAndSetDoctorVisits = async (userToken) => {
    let visits = await getAllVisits({}, userToken).then((response) => {
      if (response.status === 200) return response.json();
      return false;
    });
    if (visits === false) throw new Error("Error");
    setVisits(visits);
    
  };
  useEffect(() => {
    const fetchDataAboutDoctorVisits = async () => {
      try {
        let usertoken = getUserFromCookie()["token"];
        setLoading("yes");
        getAndSetDoctorVisits(usertoken);
        setLoading("end");
      } catch (e) {
        setLoading("error");
      }
    };
    fetchDataAboutDoctorVisits();
  }, []);
  return (
    <UserView userdata={props.userdata}>
      <main className={styles.maincomponent}>
        {loading === "yes" ? (
          <Loader />
        ) : loading === "end" ? (
          <div className={styles.maincomponent}>
            <div className={styles.visits}>
              {visits.map((visit) => (
                <div key={visit._id} className={styles.visit}>
                  <div>Date:{visit.when.split("T")[0]}</div>
                  <div>Time:{visit.time}</div>
                  <div className={styles.buttongroup}>
                    <button
                      className={styles.moreinfobutton}
                      onClick={() =>
                        router.push(`/user/doctor/allvisits/${visit._id}`)
                      }
                    >
                      More info
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : loading === "error" ? (
          <div>Error</div>
        ) : (
          <div />
        )}
      </main>
    </UserView>
  );
}
