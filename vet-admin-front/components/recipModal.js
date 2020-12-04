import {useState,useEffect} from 'react'
import styles from '../styles/doctor/RecipModal.component.module.css'
export default function RecipModal(props){
    if(!props.open)
        return null
    return <div className={styles.maincomponent}>
        <header className={styles["maincomponent__header"]}>
        Create recip
        <div
          onClick={() => props.close()}
          className={styles["header__closemodal"]}
        ></div>
      </header>
    </div>
}