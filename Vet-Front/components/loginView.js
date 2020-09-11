import React,{useState} from 'react';
import {View} from 'react-native'
import {TextInput,Button} from 'react-native-paper'
import { inject, observer } from "mobx-react";

function LoginView(props){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const loginHandle = async()=>{
        props.store.setLoggedUser(true)
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
            style={{marginTop:30}}
            onPress={()=>loginHandle()}

        >
            Login</Button>
    </View>
}
export default inject("store")(observer(LoginView));
