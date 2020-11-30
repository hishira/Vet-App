import {useState,useEffect} from 'react'
import styles from '../styles/doctor/NoteModal.component.module.css'
export default function NoteModal(props){
    const createNoteHandle = (e)=>{
        e.preventDefault();
        console.log("ok")
    }
    if(props.open){
        return (<div className={styles.noteModalComponent}>
            <header className={styles["noteModalComponent__header"]}>
                Add note
            </header>
            <div className={styles["noteModalComponent__noteform"]}>
                <form onSubmit={(e)=>createNoteHandle(e)}>
                    <label>
                        <div>
                            Note:
                        </div>
                        <input type='text'/>
                    </label>
                    <button type='submit' >Add note</button>
                </form>
            </div>
        </div>)
    }
    else 
        return null
}