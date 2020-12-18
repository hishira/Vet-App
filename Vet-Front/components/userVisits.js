import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import {
  Button,
  Card,
  Title,
  Paragraph,
  Dialog,
  Portal,
  ActivityIndicator,
} from "react-native-paper";
import { IconButton } from "react-native-paper";
import firebase from "../firebase";
import { getUserVisits } from "../api/visitApi";
import { inject, observer } from "mobx-react";
import CancelVisitDialog from "./cancelVisitDialog";
import { deleteVisitByID } from "../api/visitApi";
import { Calendar } from "react-native-calendars";
function UserVisits(props) {
  const [loading, setLoading] = useState("false");
  const [uservisits, setUserVisits] = useState([]);
  const [visitIDToCancel, setVisitIDToCancel] = useState("");
  const [calendarView, setCalendarView] = useState(false);
  const [visitCalendar,setVisitCalendar] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading("true");
        let user = firebase.auth().currentUser;
        let token = await user.getIdToken().then((res) => res);
        let obj = { userID: user.uid };
        let data = await getUserVisits(obj, token).then((response) => {
          if (response.status === 200) return response.json();
          return false;
        });
        if (data === false) throw new Error("err");
        setUserVisits(data);
        console.log(data);
        let arr = data.map(c=>c.when)
        let markedobject = {}
        for(let i of arr){
          markedobject[i] = {selected:true,marked:true,selectedColor:"blue"}
        }
        setVisitCalendar(markedobject)
        console.log(arr)
        setLoading("end");
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
    props.store.setMapInfo(obj);
    props.navigation.navigate("MapView");
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
      ) : loading === "true" ? (
        <ActivityIndicator size="large" />
      ) : loading === "error" ? (
        <View>
          <Text> Error </Text>
        </View>
      ) : (
        <View>
          {!calendarView ? (
            <View>
              <Button
                style={{
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                mode="contained"
                onPress={() => setCalendarView(true)}
              >
                Calendar view
              </Button>
              {uservisits.map((visit) => (
                <Card
                  key={visit._id}
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "90%",
                    marginTop: 10,
                    marginBottom: 20,
                  }}
                >
                  <Card.Title title={visit.when} />
                  <Card.Content>
                    <Text>Date: {visit.when}</Text>
                    <Text>Time: {visit.time}</Text>
                    <Text>
                      Clinic:{" "}
                      {`${visit.clinic.city} : ${visit.clinic.address}  `}
                    </Text>
                  </Card.Content>
                  <Card.Actions>
                    <Button onPress={() => cancelVisitHandle(visit._id)}>
                      Cancel visit
                    </Button>
                    <Button onPress={() => seeOnMapHandle(visit)}>
                      See on map
                    </Button>
                    {
                      visit.notes.length > 0?(<Button onPress={()=>props.navigation.navigate("NoteRecipVisit",{visitID:visit._id})}>See recip or note from visit</Button>):(<View/>)
                    }
                  </Card.Actions>
                </Card>
              ))}
            </View>
          ) : (
            <View>
              <Button
                style={{
                  width: "50%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                mode="contained"
                onPress={() => setCalendarView(false)}
              >
                Card view
              </Button>
              <Calendar
                
                current={new Date()}
                minDate={"2019-09-01"}
                maxDate={"2021-10-30"}
                onDayPress={(day) => {
                  console.log("selected day", day);
                }}
                onDayLongPress={(day) => {
                  console.log("selected", day);
                }}
                monthFormat={"yyyy MM"}
                onMonthChange={(month) => {
                  console.log("month changed", month);
                }}
                firstDay={1}
                showWeekNumbers={true}
                enableSwipeMonths={true}
                markedDates={visitCalendar}
              />
            </View>
          )}
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
