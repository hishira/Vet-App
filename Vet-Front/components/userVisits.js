import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { getUserPets } from "../api/petApi";
import firebase from "../firebase";
export default function UserVisits(props) {
  const [loading, setLoading] = useState("false");
  const [userPets, setUserPets] = useState([]);
  /*
  useEffect(() => {
    const fetchData = async () => {
      try {
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
        setLoading("true");
      } catch (e) {
        setLoading("error");
      }
    };
    fetchData();
  }, [props.navigation]);
  */
  return (
    <View>
      <IconButton
        icon="arrow-left-bold"
        size={30}
        style={{ marginLeft: "auto", marginRight: "auto" }}
        onPress={() => props.navigation.navigate("User")}
      />
     
      <Button
        onPress={() => props.navigation.navigate("CreateVisit")}
        style={{
          marginTop: 40,
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        mode="contained"
      >
        Make new visit
      </Button>
    </View>
  );
}
