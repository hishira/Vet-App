import {useState,useEffect} from 'react'
import UserView from '../../index';
import styles from "../../../../styles/doctor/AllVisits.module.css"
import {getAllVisits, getVisitsByDoctor} from "../../../../utils/api/visitApi";
import {getUserFromCookie} from '../../../../utils/auth/userCookies'
import Loader from '../../../../components/loader'
export default function DoctorAllVisits(props){
    const [loading,setLoading] = useState("false");
    const [visits,setVisits] = useState([]);
    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                let token = getUserFromCookie()["token"];
                setLoading("yes");
                let data = await getAllVisits({},token).then((response)=>{
                    if(response.status === 200) return response.json();
                    return  false;
                }) 
                if(data === false) throw new Error("Error")
                console.log(data);
                setVisits(data);
                setLoading("end")
            }catch(e){
                setLoading("error")
            }
        }
        fetchData();    
    },[])
    return <UserView userdata={props.userdata}>
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
                    <button className={styles.moreinfobutton} >More info</button>
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
}