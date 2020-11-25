import React, { useState } from "react";
import { ScrollView, Text, TextInput } from "react-native";
import { IconButton,Button} from "react-native-paper";
import firebase from '../firebase'
import {editPet} from '../api/petApi'
import {inject,observer} from 'mobx-react'
function EditPet(props) {
  const [petName, setPetName] = useState(props.route.params.pet.name);
  const [age, setAge] = useState(String(props.route.params.pet.age));
  const [species,setSpecies] = useState(props.route.params.pet.species)
  const editPetHandle = async ()=>{
    let obj = {
      petID:props.route.params.pet._id,
      petName:petName,
      petAge:age,
      species:species
    }
    let currentuser = firebase.auth().currentUser
    let token = await currentuser.getIdToken().then(res=>res);
    console.log(token)
    console.log(obj)
    try{
    let data = await editPet(obj,token).then(response=>{
      if(response.status === 200)
        return response.json();
      return false;
    })
    if(data === false)
      throw new Error("Server error")
    else{
      props.store.setVisitReload(!props.store.getVisitReload)
      props.navigation.navigate("UserPets")
    }
    }catch(e){
      console.log("error")
    }
    

  }
  return (
    <ScrollView>
      <IconButton
        icon="arrow-left-bold"
        size={30}
        style={{ marginLeft: "auto", marginRight: "auto" }}
        onPress={() => props.navigation.navigate("User")}
      />
      <Text
        style={{
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
      >
        Edit pet
      </Text>
      <TextInput
        placeholder="Edit pet name"
        style={{
          height: 50,
          borderColor: "gray",
          borderWidth: 0.5,
          borderRadius: 15,
          padding: 10,
          marginTop: 15,
          width:"50%",
          marginLeft:"auto",
          marginRight:"auto"
          
        }}
        value={petName}
        onChangeText={(text) => setPetName(text)}
      />
      <TextInput
        style={{
          height: 50,
          borderColor: "gray",
          borderWidth: 0.5,
          borderRadius: 15,
          padding: 10,
          marginTop: 15,
          width:"50%",
          marginLeft:"auto",
          marginRight:"auto"
        }}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <Button
        mode='contained'
        style={{
            width:"50%",
            marginLeft:"auto",
            marginRight:"auto",
            marginTop:30
        }}
        onPress={()=>editPetHandle()}
      >
          Edit pet</Button>
    </ScrollView>
  );
}
export default inject("store")(observer(EditPet));
