import React,{useState} from 'react';
import {View,Text} from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import { inject, observer } from "mobx-react";

function SignUpView(props){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [repassword,setRepassword] = useState("")
    const signUphandle = async()=>{
        props.store.setLoggedUser(true)
    }
    return <View style={{width:"50%",marginRight:"auto",marginLeft:"auto",marginTop:12}}>
        <Text style={{fontSize:25,textAlign:"center",marginBottom:12}}>Create account</Text>
        <TextInput
        label="Email"
        value={email}
        onChangeText={email=>setEmail(email)}
        />
        <TextInput
        style={{marginTop:24}}
        label="Password"
        value={password}
        autoCompleteType="password"
        onChangeText={password=>setPassword(password)}
        />
        <TextInput
        style={{marginTop:24}}
        label="Confirm password"
        value={repassword}
        autoCompleteType="password"
        onChangeText={repassword=>setRepassword(repassword)}
        />
        <Button
            mode='contained'
            style={{marginTop:30}}
            onPress={()=>signUphandle()}

        >
            Sign Up</Button>
    </View>
}
export default inject("store")(observer(SignUpView));
