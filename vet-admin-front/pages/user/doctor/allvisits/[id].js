import { useState, useEffect } from "react";
import User from "../../index";
import UserView from "../../index";
import { getInfoAboutVisit } from "../../../../utils/api/visitApi";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
import Loading from "../../../../components/loader";
import styles from "../../../../styles/doctor/SpecificVisit.module.css";
import { useRouter } from "next/router";
export default function SpecificVisit(props) {
  const [visitInfo, setVisitInfo] = useState({});
  const [loading, setLoading] = useState("no");
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const fetchData = async () => {
      let obj = {
        visitID: id,
      };
      const token = getUserFromCookie()["token"];
      try {
        setLoading("yes");
        let data = await getInfoAboutVisit(obj, token).then((reseponse) => {
          if (reseponse.status === 200) return reseponse.json();
          return false;
        });
        if (data === false) throw new Error("error");
        setVisitInfo(data);
        console.log(data);
        setLoading("end");
      } catch (e) {
        setLoading("error");
      }
    };
    fetchData();
  }, []);
  return (
    <UserView userdata={props.userdata}>
      {loading === "yes" ? (
        <Loading />
      ) : loading === "end" ? (
        <main className={styles.maincomponent}>
          <header className={styles["maincomponent__header"]}>
            <div className={styles["header__text"]}>
              Visit Date:{" "}
              {`${visitInfo.when.split("T")[0]} at ${visitInfo.time
                .split(":")
                .filter((arr, index, element) => index < 2)
                .join(":")}`}
            </div>
          </header>
        </main>
      ) : loading === "error" ? (
        <div>Error</div>
      ) : (
        <div />
      )}
    </UserView>
  );
}
