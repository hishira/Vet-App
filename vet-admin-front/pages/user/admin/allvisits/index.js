import { useState, useEffect } from "react";
import UserView from "../../index";
import { getAllVisits } from "../../../../utils/api/visitApi";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
import Loader from "../../../../components/loader";
export default function AllVisits(props) {
  const [loading, setLoading] = useState("false");
  const [visits, setVisits] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let token = getUserFromCookie()["token"];
        setLoading("yes");
        let data = await getAllVisits({}, token).then((response) => {
          if (response.status === 200) return response.json();
          return false;
        });
        if (data === false) throw new Error("Error");
        setVisits(data);
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
      <div>
        {loading === "yes" ? (
          <Loader />
        ) : loading === "end" ? (
          <div />
        ) :loading === "error"? (
          <div>Error</div>
        ):(<div/>)
        }
      </div>
    </UserView>
  );
}
