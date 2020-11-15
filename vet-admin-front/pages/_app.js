import '../styles/globals.css';
import { getUserInfo } from "../utils/api/userApi";
import { getUserFromCookie } from "../utils/auth/userCookies";
function MyApp({ Component, pageProps,user }) {
  return <Component {...pageProps} userdata={user}/>
}
MyApp.getInitialProps = async ({Component,ctx})=>{
  const auth = getUserFromCookie();
  let user = {};
  if (typeof auth === "object") {
    let obj = {
      userID: auth["id"],
    };
    user = await getUserInfo(obj, auth["token"]).then((response) => {
      if (response.status === 200) return response.json();
      return false;
    });
    user = user[0];
    if (user !== false) user["email"] = auth["email"];
  }
  let pageProps={}
  if(Component.getInitialProps){
    pageProps = await Component.getInitialProps(ctx);
  }
  console.log("User",user);
  return { pageProps,user};
}
export default MyApp
