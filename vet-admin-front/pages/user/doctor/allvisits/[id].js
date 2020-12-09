import { useState, useEffect } from "react";
import UserView from "../../index";
import { getInfoAboutVisit } from "../../../../utils/api/visitApi";
import { getUserFromCookie } from "../../../../utils/auth/userCookies";
import Loading from "../../../../components/loader";
import styles from "../../../../styles/doctor/SpecificVisit.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import NoteModal from "../../../../components/noteModal";
import RecipModal from '../../../../components/recipModal'
export default function SpecificVisit(props) {
  const [visitInfo, setVisitInfo] = useState({});
  const [loading, setLoading] = useState("no");
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [noteInfoObject, setNoteInfoObject] = useState({});
  const [reloadInfo,setReloadInfo] = useState(false);
  const [recipModalOpen, setRecipModalOpen] = useState(false);
  const [recipInfoObject, setRecipInfoObject] = useState({});
  const [recipVisit,setRecipVisit] = useState("");
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
  }, [reloadInfo]);
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
  const handleClose = () => {
    setNoteModalOpen(!noteModalOpen);
  };
  const handleCloseRecip = ()=>{
    setRecipModalOpen(!recipModalOpen);
  }
  const reloadHandle = ()=>{
    setReloadInfo(!reloadInfo)
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
                  onClick={()=>{
                    setRecipVisit(visitInfo._id);
                    setRecipModalOpen(!recipModalOpen)
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
                  <div className={styles["notes__note"]}>{note.content}</div>
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
