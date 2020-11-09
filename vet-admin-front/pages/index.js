import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
export default function Home() {
  return (
    <div className={styles.maincontainer}>
      <Link href='/login'>
      <button className={styles.login}>
        Login
      </button>
      </Link>
    </div>
  )
}
