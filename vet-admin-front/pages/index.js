import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useUser} from '../utils/auth/useUser'
import UserStore from '../stores/userStore'
import {useContext} from 'react'
import { observer } from 'mobx-react';
import {islogin} from '../utils/auth/loginuser'
function Home({userlogged}){
  const store = useContext(UserStore);
  const {user,logout} = useUser(store);
  
  console.log(store.isLogged)
  if(!store.isLogged){
  return (
    <div className={styles.maincontainer}>
      <Link href='/login'>
      <button className={styles.login}>
        Login
      </button>
      </Link>
    </div>
  )
  }else
    return<div>
      <button onClick={()=>logout()}>Logout</button>
    </div>
}
Home.getInitialProps = async(ctx)=>{
  const response = await islogin();
  console.log(response)
  return {
    userlogged:response
  }
}
export default Home;