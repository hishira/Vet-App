import {useState,useEffect} from 'react'
import styles from '../styles/successfulmessage.component.module.css'

export default function SuccessfulMessage(props){
    if(props.open)
    return(<div style={{backgroundColor:props?.color!==""? props.color: "rgb(168, 253, 168,.7)"}} className={styles["successfullmessage"]}>
        <div  className={styles["successfullmessage__message"]}>{props.message}</div>
    </div>)
    return null
}