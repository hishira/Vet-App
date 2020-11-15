import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useUser} from '../utils/auth/useUser'
import UserStore from '../stores/userStore'
import {useContext} from 'react'
import {useRouter} from 'next/router'
import {islogin} from '../utils/auth/loginuser'
import {getUserFromCookie} from '../utils/auth/userCookies'
function Home(props){
  const store = useContext(UserStore);
  const {user,logout} = useUser();
  const router = useRouter();
  if(Object.keys(props.userdata).length <= 0 && Object.keys(getUserFromCookie()? getUserFromCookie():{}) <= 0){
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