import { useState, useEffect } from "react";
import UserView from "../../index";
import { getInfoAboutVisit } from "../../../../utils/api/visitApi";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
import Loading from "../../../../components/loader";
import styles from "../../../../styles/doctor/SpecificVisit.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import NoteModal from "../../../../components/noteModal";
import RecipModal from "../../../../components/recipModal";
import { GetRecipByVisit } from "../../../../utils/api/recipApi";
import {deleteNote} from '../../../../utils/api/noteApi';
export default function SpecificVisit(props) {
  const [visitInfo, setVisitInfo] = useState({});
  const [loading, setLoading] = useState("no");
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteInfoObject, setNoteInfoObject] = useState({});
  const [reloadInfo, setReloadInfo] = useState(false);
  const [recipModalOpen, setRecipModalOpen] = useState(false);
  const [recips, setRecips] = useState([]);
  const [recipVisit, setRecipVisit] = useState("");
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
        let recipsbyvisit = await GetRecipByVisit(obj, token).then(
          (response) => {
            if (response.status === 200) return response.json();
            return false;
          }
        );
        if (data === false || recipsbyvisit === false) throw new Error("error");
        setVisitInfo(data);
        setRecips(recipsbyvisit);
        setLoading("end");
        setTimeout(()=>injectEventHover(),500);
      } catch (e) {
        setLoading("error");
      }
    };
    fetchData();
  }, [reloadInfo]);
  const injectEventHover = ()=>{
    let elements = document.getElementsByClassName(styles["notes__button"])
    console.log(elements)
    for(let i of elements){
      i.addEventListener("mouseover",(event)=>{
        let target = event.target.previousSibling
        target.style.display='inline'
        console.log(target)
      })
      i.addEventListener("mouseout",(event)=>{
        let target = event.target.previousSibling
        target.style.display='none'
        console.log(target)
      })
    }
  }
  const addNoteHandle = ({ _id, pet }) => {
    let modalInfo = {
      petID: pet._id,
      visitID: _id,
    };
    if (!noteModalOpen) {
      setNoteInfoObject(modalInfo);
      setNoteModalOpen(!noteModalOpen);
    }
  };
  const deletenoteHandle = async (noteid)=>{
    let token = getUserFromCookie()["token"]
    console.log(token)
    try{
      let obj = {
        noteID:noteid
      }
      let data = await deleteNote(obj,token).then(resp=>{
        if(resp.status === 200)
          return true;
        return false;
      });
      if(data === true)
        setReloadInfo(!reloadInfo)
    }catch(e){
      console.log(e)
    }
  }
  const handleClose = () => {
    setNoteModalOpen(!noteModalOpen);
  };
  const handleCloseRecip = () => {
    setRecipModalOpen(!recipModalOpen);
  };
  const reloadHandle = () => {
    setReloadInfo(!reloadInfo);
  };
  const prepareMedicines = (array)=>{
    let arrofobj = []
    let set = new Set(array.map(a=>a.name).slice())
    for(let i of set){
      console.log(i)
      arrofobj.push({name:i,count:array.filter(med=>med.name === i).length})
    }
    return arrofobj;
  }
  return (
    <UserView userdata={props.userdata}>
      <NoteModal
        open={noteModalOpen}
        close={handleClose}
        noteInfo={noteInfoObject}
        reload={reloadHandle}
      />
      <RecipModal
        open={recipModalOpen}
        close={handleCloseRecip}
        reload={reloadHandle}
        visit={recipVisit}
      />
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
          <div className={styles["maincomponent__doctorinfo"]}>
            <div className={styles["doctorinfo__petinfo"]}>
              <div>
                <Image
                  src="/Flowers.png"
                  width={150}
                  height={150}
                  quality={100}
                />
              </div>
              <div>Name: {visitInfo.pet.name}</div>
              <div>Age: {visitInfo.pet.age}</div>
              <div>Species: {visitInfo.pet.species}</div>
              <div className={styles["petinfo__buttons"]}>
                <button
                  className={styles["buttons__button"]}
                  onClick={() => addNoteHandle(visitInfo)}
                >
                  Create note
                </button>
                <button
                  className={`${styles["buttons__button"]} ${styles["buttons__button--recipe"]}`}
                  onClick={() => {
                    setRecipVisit(visitInfo._id);
                    setRecipModalOpen(!recipModalOpen);
                  }}
                >
                  Create recipe
                </button>
              </div>
            </div>
            <div className={styles["doctorinfo__otherinfo"]}>
              <div className={styles["notes__title"]}>Created notes:</div>
              <div className={styles["petinfo__notes"]}>
                {visitInfo.notes.map((note) => (
                  <div className={styles["notes__note"]}>
                  <div >{note.content}</div>
                  <span className={styles["notes__delete"]}>Delete</span>
                  <button onClick={()=>deletenoteHandle(note._id)} className={styles["notes__button"]}></button>
                  </div>
                ))}
              </div>
              <div>Recips</div>
              
                <div className={styles["visit__recips"]}>
                  {recips.map((recip) => (
                    <div className={styles["recipes__recip"]}>
                      {prepareMedicines(recip.medicines).slice(0,4).map((med) => (
                        <div className={styles["recip__medname"]} >
                          {med.name} x {med.count}
                        </div>
                      ))}
                      <span className={styles["notes__delete"]}>Delete</span>
                      <button className={styles["notes__button"]}></button>
                    </div>
                  ))}
                </div>
            </div>
          </div>
        </main>
      ) : loading === "error" ? (
        <div>Error</div>
      ) : (
        <div />
      )}
    </UserView>
  );
}
