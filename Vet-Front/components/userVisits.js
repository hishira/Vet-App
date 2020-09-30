import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { IconButton } from "react-native-paper";
import firebase from "../firebase";
import {getUserVisits} from '../api/visitApi'
export default function UserVisits(props) {
  const [loading, setLoading] = useState("false");
  const [uservisits, setUserVisits] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let user = firebase.auth().currentUser;
        let token = await user.getIdToken().then((res) => res);
        let obj = { userID: user.uid };
        let data = await getUserVisits(obj, token).then((response) => {
          if (response.status === 200) return response.json();
          return false;
        });
        console.log(data);
        if (data === false) throw new Error("err");
        setUserVisits(data);
        setLoading("true");
      } catch (e) {
        setLoading("error");
      }
    };
    fetchData();
  }, [props.navigation]);

  return (
    <View>
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
      ) : (
        <View style={{display:"flex",flexDirection:"row",flexWrap:"wrap"}}>
          {uservisits.map((visit) => (
            <Card style={{marginLeft: "auto",marginRight: "auto",width:"45%",marginTop:10}}>
              <Card.Title style={{}} title={visit.when}/>
              <Card.Content>
                  <Text>Date: {visit.when}</Text>
                  <Text>Time: {visit.time}</Text>
              </Card.Content>
              <Card.Actions>
                  <Button>Reserve visit</Button>
                  <Button>See history</Button>
                  </Card.Actions>
            </Card>
          ))}
        </View>
      )}
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
