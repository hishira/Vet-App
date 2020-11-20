import { useState, useEffect } from "react";
import UserView from "../../index";
import { useRouter } from "next/router";
import { getInfoAboutVisit } from "../../../../utils/api/visitApi";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
import Loading from "../../../../components/loader";
export default function VisitById(props) {
  const [visitInfo,setVisitInfo] = useState({});
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
        let data = await getInfoAboutVisit(obj, token).then((response) => {
          if (response.status === 200) return response.json();
          return false;
        });
        if (data === false) throw new Error("error");
        setVisitInfo(data);
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
        <div>{JSON.stringify(visitInfo)}</div>
      ) : loading === "error" ? (
        <div>Error</div>
      ) : (
        <div />
      )}
    </UserView>
  );
}
