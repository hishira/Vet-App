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
import { deleteNote } from "../../../../utils/api/noteApi";
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

  const fetchGeneralDataAboutVisit = async(objecttosend,usertoken)=>{
    let data = await getInfoAboutVisit(objecttosend, usertoken).then(
      (reseponse) => {
        if (reseponse.status === 200) return reseponse.json();
        return false;
      }
    );
    return data
  }
  const fetchDataAboutVisitRecips = async (objecttosent,usertoken) =>{
    let recipsbyvisit = await GetRecipByVisit(objecttosent, usertoken).then(
      (response) => {
        if (response.status === 200) return response.json();
        return false;
      }
    );
    return recipsbyvisit;
  }
  const fetchDataAboutVisit = async (objecttosend, usertoken) => {
    /*
    Fetch data about visit, first return general 
    data about visit and next recive data about recip
    from visit
    */
    setLoading("yes");
    let generaldata = await fetchGeneralDataAboutVisit(objecttosend,usertoken);
    let visitrecipsdata = await fetchDataAboutVisitRecips(objecttosend,usertoken)
    return { visitdata: generaldata, recipdata: visitrecipsdata };
  };
  const setRecivedDataAndSetLoading = (fetchedData) => {
    setVisitInfo(fetchedData.visitdata);
    setRecips(fetchedData.recipdata);
    setLoading("end");
    setTimeout(() => injectEventHover(), 500);
  };
  useEffect(() => {
    const fetchDataAndSetData = async () => {
      let obj = {
        visitID: id,
      };
      const token = getUserFromCookie()["token"];
      try {
        let alldata = await fetchDataAboutVisit(obj, token);
        if (alldata.visitdata === false || alldata.recipdata === false)
          throw new Error("error");
        setRecivedDataAndSetLoading(alldata);
      } catch (e) {
        console.log(e);

        setLoading("error");
      }
    };
    fetchDataAndSetData();
  }, [reloadInfo]);

  const mouseeventlementfunction = (event,displayvalue) => {
    let target = event.target.previousSibling;
    target.style.left=`${event.target.getBoundingClientRect().left - 25}px`
    target.style.top = `${event.target.getBoundingClientRect().top/2 - 25}px`
    target.style.display = displayvalue;
  };
  const injectEventHover = () => {
    let elements = document.getElementsByClassName(styles["notes__button"]);
    for (let i of elements) {
      i.addEventListener("mouseover", (event) => {
        mouseeventlementfunction(event,"inline")
      });
      i.addEventListener("mouseout", (event) => {
        mouseeventlementfunction(event,"none")

      });
    }
  };
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
  const deleteNoteByID = async (noteID,usertoken) =>{
    let obj = {
      noteID: noteID,
    };
    let data = await deleteNote(obj, usertoken).then((resp) => {
      if (resp.status === 200) return true;
      return false;
    });
    return data;

  }
  const deletenoteHandle = async (noteid) => {
    let usertoken = getUserFromCookie()["token"];
    try {
      let data = await deleteNoteByID(noteid,usertoken);
      if (data === true) setReloadInfo(!reloadInfo);  
    } catch (e) {
      console.log(e);
    }
  };
  const handleClose = () => {
    setNoteModalOpen(!noteModalOpen);
  };
  const handleCloseRecip = () => {
    setRecipModalOpen(!recipModalOpen);
  };
  const reloadHandle = () => {
    setReloadInfo(!reloadInfo);
  };
  const prepareMedicines = (arrayofmedicines) => {
    let onenamearrayofmedicines = [];
    let setofmedicines = new Set(arrayofmedicines.map((a) => a.name).slice());
    for (let i of setofmedicines) {
      onenamearrayofmedicines.push({
        name: i,
        count: arrayofmedicines.filter((medicine) => medicine.name === i).length,
      });
    }
    return onenamearrayofmedicines;
  };
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
                    <div>{note.content}</div>
                    <span className={styles["notes__delete"]}>Delete</span>
                    <button
                      onClick={() => deletenoteHandle(note._id)}
                      className={styles["notes__button"]}
                    ></button>
                  </div>
                ))}
              </div>
              <div>Recips</div>

              <div className={styles["visit__recips"]}>
                {recips.map((recip) => (
                  <div className={styles["recipes__recip"]}>
                    {prepareMedicines(recip.medicines)
                      .slice(0, 4)
                      .map((med) => (
                        <div className={styles["recip__medname"]}>
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
