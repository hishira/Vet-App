import {useState} from 'react'
import {logout} from '../../utils/auth/loginuser'
import {useRouter} from 'next/router'
import styles from '../../styles/User.module.css'

function User(){
    const router = useRouter();
    return<div className={styles.usermaincontainer}>
        <header className={styles.userheader}>
        <button className={styles.logoutbutton} onClick={()=>logout(router)}>Logout</button>
        </header>
    </div>
}

export default  User