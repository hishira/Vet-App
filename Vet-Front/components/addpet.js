import React, { useState } from "react";
import { Text, View, Picker, ScrollView,TextInput } from "react-native";
import {  Button, IconButton } from "react-native-paper";
import firebase from "../firebase";
import { addPet } from "../api/petApi";
import { inject, observer } from "mobx-react";
function AddPet(props) {
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const [species, setSpecies] = useState("Dog");
  const [userID, setUserID] = useState("");
  const addPetHandle = async () => {
    let user = firebase.auth().currentUser;
    const obj = {
      name: petName,
      age: parseInt(age),
      species: species,
      userID: user.uid,
    };
    console.log(obj);
    let token = 0;
    try {
      token = await user.getIdToken().then((res) => res);
    } catch (e) {
      return;
    }
    let data = false;
    try {
      data = await addPet(obj, token).then((res) => {
        if (res.status === 200) return true;
        else return false;
      });
    } catch (e) {
      data = false;
    }
    if (data) {
      props.store.setVisitReload(!props.store.getVisitReload);
      console.log("OK");
      props.navigation.navigate("UserPets");
    }
  };
  return (
    <ScrollView
      style={{
        marginTop: 30,
        width:"70%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <IconButton
        icon="arrow-left-bold"
        size={30}
        style={{ marginLeft: "auto", marginRight: "auto" }}
        onPress={() => props.navigation.navigate("UserPets")}
      />
      <Text>Add pet</Text>
      <TextInput
        placeholder="Pet name"
        style={{
          height:50,
          borderColor:"gray",
          borderWidth:0.5,
          borderRadius:15,
          padding:10,
          marginTop:15
        }}
        value={petName}
        onChangeText={(text) => setPetName(text)}
      />
      <TextInput
        style={{
          height:50,
          borderColor:"gray",
          borderWidth:0.5,
          borderRadius:15,
          padding:10,
          marginTop:15
        }}
        placeholder="Age"
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <Picker
        style={{ marginTop: 50 }}
        selectedValue={species}
        style={{ height: 50, width: 150,marginLeft:"auto",textAlign:"center",marginRight:"auto" }}
        onValueChange={(itemValue, index) => setSpecies(itemValue)}
        itemStyle={{textAlign:"center"}}
      >
        <Picker.Item label="Dog" value="Dog" />
        <Picker.Item label="Cat" value="Cat" />
        <Picker.Item label="Parrot" value="Parrot" />
        <Picker.Item label="Hamster" value="Hamster" />
        <Picker.Item label="Guinea Pig" value="Guinea Pig" />
      </Picker>
      <Button
        onPress={() => addPetHandle()}
        style={{
          width: "50%",
          marginLeft:"auto",
          marginRight:"auto",
          marginVertical:15
        }}
        mode="contained"
      >
        Add new pet
      </Button>
    </ScrollView>
  );
}
export default inject("store")(observer(AddPet));
