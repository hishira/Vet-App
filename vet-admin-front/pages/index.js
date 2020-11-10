import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {useUser} from '../utils/auth/useUser'
import UserStore from '../stores/userStore'
import {useContext} from 'react'
import {useRouter} from 'next/router'
import {islogin} from '../utils/auth/loginuser'
function Home({userlogged}){
  const store = useContext(UserStore);
  const {user,logout} = useUser(store);
  const router = useRouter();
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
  }else{
    router.push('/user')
    return <div/>
  }
}
Home.getInitialProps = async(ctx)=>{
  const response = await islogin();
  console.log(response)
  return {
    userlogged:response
  }
}
export default Home;