import {logout} from '../../utils/auth/loginuser'
import {useRouter} from 'next/router'
export default function User(){
    const router = useRouter()
    return<div>
        <button onClick={()=>logout(router)}>Logout</button>
    </div>
}