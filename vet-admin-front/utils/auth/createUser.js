import firebase from 'firebase';
import {secondaryInit} from './initFirebase';
import {createUser} from '../api/userApi';
secondaryInit();

export const createFirebaseUser = async (email,password,userType)=>{
    let secondstage = firebase.auth();
    let d = await secondstage.createUserWithEmailAndPassword(email,password).then(async user=>{
        let ifwecanusercreate = await createUser({userID:user.user.uid,userTYPE:userType}).then(response=>{
            if(response.status === 200)
                return true;
            return false;
        })
        if(ifwecanusercreate)
            console.log("Ok")
    }).catch(e=>console.log(e))
}