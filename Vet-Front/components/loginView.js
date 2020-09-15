import React,{useState} from 'react';
import {View,Text} from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import { inject, observer } from "mobx-react";

function LoginView(props){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const loginHandle = async()=>{
        props.store.setLoggedUser(true)
    }
    const signUpHandle = ()=>{
        props.navigator.navigate('SignUp')
    }
    return <View style={{width:"50%",marginRight:"auto",marginLeft:"auto",marginTop:12}}>
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
        <Button
            mode='contained'
            style={{marginTop:30,marginBottom:10}}
            onPress={()=>loginHandle()}
        >
            Login</Button>
            <Text style={{textAlign:"center"}}>Or</Text>
            <Button
            mode='contained'
            style={{marginTop:10}}
            onPress={()=>signUpHandle()}
        >
            SignUp</Button>
    </View>
}
export default inject("store")(observer(LoginView));
