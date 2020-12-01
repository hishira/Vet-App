import { useState, useEffect } from "react";
import styles from "../styles/doctor/NoteModal.component.module.css";
import { createNote } from "../utils/api/noteApi";
import { getUserFromCookie } from "../utils/auth/userCookies";
import SuccessfullMessage from "../components/successfulmessage";
export default function NoteModal(props) {
  const [noteContent, setNoteContent] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const createNoteHandle = async (e) => {
    e.preventDefault();
    let obj = {
      content: noteContent,
      petID: props.noteInfo.petID,
      visitID: props.noteInfo.visitID,
    };
    let token = getUserFromCookie()["token"];
    console.log(obj, token);
    let fetchedData = await createNote(obj, token).then((response) => {
      console.log(response)
      if (response.status === 200) 
        return response.json();
      return false;
    });
    if (fetchedData === false) {
      setMessageText("Problem with note add");
      setMessageColor("lightcoral");
      setMessageOpen(!messageOpen);
      setTimeout(() => setMessageOpen(false), 1500);
      return;
    }
    setMessageText("OK, note added");
    setMessageColor("");
    setMessageOpen(!messageOpen);
    setTimeout(() => setMessageOpen(false), 1500);
  };
  if (!props.open) {
    return null;
  }
  return (
    <div className={styles.noteModalComponent}>
      <SuccessfullMessage
        open={messageOpen}
        color={messageColor}
        message={messageText}
      />
      <header className={styles["noteModalComponent__header"]}>
        Add note
        <div
          onClick={() => props.close()}
          className={styles["header__closemodal"]}
        ></div>
      </header>
      <div className={styles["noteModalComponent__noteform"]}>
        <form
          className={styles["noteform__form"]}
          onSubmit={(e) => createNoteHandle(e)}
        >
          <label className={styles["form__labelNote"]}>
            <div>Note</div>
            <textarea
              onChange={(e) => setNoteContent(e.target.value)}
              className={styles["labelNote__textarea"]}
            />
          </label>
          <button className={styles["form__button"]} type="submit">
            Add note
          </button>
        </form>
      </div>
    </div>
  );
}
