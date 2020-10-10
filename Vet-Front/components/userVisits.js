import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  Dialog,
  Portal,
} from "react-native-paper";
import { IconButton } from "react-native-paper";
import firebase from "../firebase";
import { getUserVisits } from "../api/visitApi";
import { inject, observer } from "mobx-react";
import CancelVisitDialog from "./cancelVisitDialog";
import { deleteVisitByID } from "../api/visitApi";

function UserVisits(props) {
  const [loading, setLoading] = useState("false");
  const [uservisits, setUserVisits] = useState([]);
  const [visitIDToCancel, setVisitIDToCancel] = useState("");
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
        console.log(data);
        setLoading("true");
      } catch (e) {
        setLoading("error");
      }
    };
    fetchData();
  }, [props.store.getVisitReload]);
  const cancelVisitHandle = async (visitID) => {
    console.log(visitID);
    setVisitIDToCancel(visitID);
    props.store.setCancelVisit(true);
  };
  const canceltHandle = async (visitid) => {
    console.log(visitid);
    let user = firebase.auth().currentUser;
    let token = await user.getIdToken().then((res) => res);
    let obj = {
      visitID: visitid,
    };
    console.log(token);
    let data = await deleteVisitByID(obj, token).then((res) => {
      if (res.status === 200) return true;
      return false;
    });
    if (data) {
      props.store.setVisitReload(!props.store.getVisitReload);
      props.store.setCancelVisit(false);
    }
  };
  const seeOnMapHandle = (visit) => {
    let obj = {
      citylatitude: visit.clinic.citylatitude,
      citylongitude: visit.clinic.citylongitude,
      addresslatitude: visit.clinic.addresslatitude,
      addresslongitude: visit.clinic.addresslongitude,
    };
    props.store.setMapInfo(obj)
    props.navigation.navigate("MapView")
  };
  return (
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
      ) : (
        <View>
          {uservisits.map((visit) => (
            <Card
              key={visit._id}
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "90%",
                marginTop: 10,
              }}
            >
              <Card.Title title={visit.when} />
              <Card.Content>
                <Text>Date: {visit.when}</Text>
                <Text>Time: {visit.time}</Text>
                <Text>
                  Clinic: {`${visit.clinic.city} : ${visit.clinic.address}  `}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button onPress={() => cancelVisitHandle(visit._id)}>
                  Cancel visit
                </Button>
                <Button onPress={() => seeOnMapHandle(visit)}>
                  See on map
                </Button>
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
          marginBottom: 10,
        }}
        mode="contained"
      >
        Make new visit
      </Button>
      <CancelVisitDialog
        cancelvisitHandle={canceltHandle}
        visitID={visitIDToCancel}
        message={"Dou you wana delete visit?"}
      />
    </ScrollView>
  );
}
export default inject("store")(observer(UserVisits));
