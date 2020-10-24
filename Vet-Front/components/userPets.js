import React, { useState, useEffect, useRef } from "react";
import { View, Text, ScrollView, Animated,ActivityIndicator } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { getUserPets, deletePet } from "../api/petApi";
import firebase from "../firebase";
import CancelVisitDialog from "./cancelVisitDialog";
import { inject, observer } from "mobx-react";

function UserPets(props) {
  const [loading, setLoading] = useState("false");
  const [userPets, setUserPets] = useState([]);
  const [petToDelete, setPetToDelete] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading("true")
        let user = firebase.auth().currentUser;
        let token = await user.getIdToken().then((res) => res);
        let obj = { userID: user.uid };
        let data = await getUserPets(obj, token).then((response) => {
          if (response.status === 200) return response.json();
          return false;
        });
        console.log(data);
        if (data === false) throw new Error("err");
        setUserPets(data);
        setLoading("end");
      } catch (e) {
        setLoading("error");
      }
    };
    fetchData();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [props.store.getVisitReload]);
  const deletePetHandle = (id) => {
    setPetToDelete(id);
    console.log(id);
    props.store.setCancelVisit(true);
  };
  const deletepetfunction = async (id) => {
    let user = firebase.auth().currentUser;
    let token = await user.getIdToken().then((res) => res);
    let obj = {
      petID: id,
    };
    let data = await deletePet(obj, token).then((response) => {
      if (response.status === 200) return true;
      return false;
    });
    if (data) {
      props.store.setVisitReload(!props.store.getVisitReload);
      props.store.setCancelVisit(false);
    }
  };
  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <ScrollView>
        <IconButton
          icon="arrow-left-bold"
          size={30}
          style={{ marginLeft: "auto", marginRight: "auto" }}
          onPress={() => props.navigation.navigate("User")}
        />
        {loading === "false" ? (
          <View />
        ) : loading === "error" ? (
          <View>
            <Text> Error </Text>
          </View>
        ) : loading === "true"?(<ActivityIndicator size='large' />) : (
          <View style={{}}>
            {userPets.map((pet) => (
              <Card key={pet._id} style={{ marginTop: 10 }}>
                <Card.Title style={{}} title={`Pet name: ${pet.name}`} />
                <Card.Content>
                  <Text>Age: {pet.age}</Text>
                  <Text>Species: {pet.species}</Text>
                </Card.Content>
                <Card.Actions>
                  <Button onPress={() => deletePetHandle(pet._id)}>
                    Delete pet
                  </Button>
                  <Button onPress={()=>props.navigation.navigate("PetClinicHistory",{petID:pet._id})}>
                    Pet clinic history
                  </Button>
                  <Button onPress={()=>props.navigation.navigate("EditPet",{pet:pet})}>
                    Edit pet info
                  </Button>
                </Card.Actions>
              </Card>
            ))}
          </View>
        )}
        <Button
          onPress={() => props.navigation.navigate("AddPet")}
          style={{
            marginTop: 40,
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          mode="contained"
        >
          Add new pet
        </Button>
      </ScrollView>
      <CancelVisitDialog
        visitID={petToDelete}
        message={"Are you sure to delete these pet?"}
        cancelvisitHandle={deletepetfunction}
      />
    </Animated.View>
  );
}
export default inject("store")(observer(UserPets));
