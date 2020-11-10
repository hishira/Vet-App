import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useUser} from '../utils/auth/useUser'
export default function Home() {
  const {user,logout} = useUser();
  if(!user){
  return (
    <div className={styles.maincontainer}>
      <Link href='/login'>
      <button className={styles.login}>
        Login
      </button>
      </Link>
    </div>
  )
  }else{
    return<div>User</div>
  }
}
