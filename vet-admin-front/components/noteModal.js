import { useState, useEffect } from "react";
import styles from "../styles/doctor/NoteModal.component.module.css";
export default function NoteModal(props) {
  const createNoteHandle = (e) => {
    e.preventDefault();
    console.log("ok");
  };
  if (props.open) {
    return (
      <div className={styles.noteModalComponent}>
        <header className={styles["noteModalComponent__header"]}>
          Add note
        </header>
        <div className={styles["noteModalComponent__noteform"]}>
          <form
            className={styles["noteform__form"]}
            onSubmit={(e) => createNoteHandle(e)}
          >
            <label className={styles["form__labelNote"]}>
              <div>Note</div>
              <textarea className={styles["labelNote__textarea"]} />
            </label>
            <button className={styles["form__button"]} type="submit">Add note</button>
          </form>
        </div>
      </div>
    );
  } else return null;
}
