import React, { useState } from "react";
import { ScrollView, Text, TextInput } from "react-native";
import { IconButton,Button} from "react-native-paper";

function EditPet(props) {
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const editPetHandle = async ()=>{

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
export default EditPet;
