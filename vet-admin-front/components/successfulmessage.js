import {useState,useEffect} from 'react'
import styles from '../styles/successfulmessage.component.module.css'

export default function SuccessfulMessage(props){
    if(props.open)
    return(<div className={styles["successfullmessage"]}>
        <div className={styles["successfullmessage__message"]}>{props.message}</div>
    </div>)
    return null
}