import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useUser} from '../utils/auth/useUser'
import UserStore from '../stores/userStore'
import {useContext} from 'react'
import {useRouter} from 'next/router'
import {islogin} from '../utils/auth/loginuser'
function Home(props){
  const store = useContext(UserStore);
  const {user,logout} = useUser();
  const router = useRouter();
  if(!props.userdata){
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
    return<button onClick={()=>router.push("/user")}>User</button>
  }
}
export default Home;