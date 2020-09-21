import React,{useState} from 'react'
import {Button } from 'react-native-paper'
export default function UserPets(props){
    return (
        <Button onPress={()=>props.navigation.navigate("AddPet")} style={{marginTop:40,width:"50%",marginLeft:"auto",marginRight:"auto"}}  mode='contained'>
            Add new pet
        </Button>

    )
}