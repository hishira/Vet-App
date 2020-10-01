import React, { useState, useEffect } from "react";
import { View, Text, Picker, ScrollView } from "react-native";
import { Button, Card, Surface, Title, Paragraph } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { getUserPets } from "../api/petApi";
import firebase from "../firebase";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
import { color } from "react-native-reanimated";
import { inject, observer } from "mobx-react";
import { createVisit } from "../api/visitApi";
function CreateVisit(props) {
  const [loading, setLoading] = useState("false");
  const [selectedDays, setSelectedDays] = useState({});
  const [secondStage, setSecondStage] = useState(false);
  const [visitTime, setTime] = useState("");
  const [userPets, setUserPets] = useState([]);
  const [pet, setPet] = useState("");

  const [clicked, setClicked] = useState(-1);
  useEffect(() => {
    const createTimeArrays = () => {
      let arr = [];
      let startDate = new Date(Date.UTC(2020, 9, 25, 8, 0, 0));
      let endDate = new Date(Date.UTC(2020, 9, 25, 16, 0, 0));
      let count = 0;
      while (startDate.getTime() !== endDate.getTime()) {
        let k = startDate;
        arr.push([k.toUTCString().split(" ")[4], count]);
        console.log(k);
        startDate.setMinutes(startDate.getMinutes() + 15);
        count += 1;
      }
      props.store.setTimesArray(arr);
      console.log(arr.length);
    };
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
        if (data !== []) setPet(data[0]._id);
        setUserPets(data);
        setLoading("true");
      } catch (e) {
        setLoading("error");
      }
    };
    fetchData();
    createTimeArrays();
  }, [props.navigation]);
  const createVisitHandle = async () => {
    let obj = {
      visitDay: Object.keys(selectedDays)[0],
      time: visitTime,
      petID: pet,
    };
    try {
      let user = firebase.auth().currentUser;
      let token = await user.getIdToken().then((res) => res);
      obj.userID = user.uid
      let data = await createVisit(obj,token).then(response=>{
        if(response.status === 200)
          return true;
        return false
      })
      if(data === true){
        console.log("Tak")
        props.store.setVisitReload(!props.store.getVisitReload)
        props.navigation.navigate("Visits")
      }else
        console.log("Nie")
    } catch (e) {
      return;
    }
  };
  return (
    <ScrollView>
      <IconButton
        icon="arrow-left-bold"
        size={30}
        style={{ marginLeft: "auto", marginRight: "auto" }}
        onPress={() => props.navigation.navigate("Visits")}
      />
      <View>
        <Calendar
          markedDates={selectedDays}
          current={"2020-09-23"}
          minDate={"2020-09-01"}
          maxDate={"2020-10-30"}
          onDayPress={(day) => {
            console.log("selected day", day);
            let choiceDay = `${day.dateString}`;
            let obj = {};
            obj[choiceDay] = { selected: true, color: "blue" };
            setSelectedDays(obj);
            setSecondStage(true);
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
          renderHeader={(date) => {
            /*Return JSX*/
          }}
          enableSwipeMonths={true}
        />
        {Object.keys(selectedDays).length > 0 ? (
          <IconButton
            icon="arrow-right-bold"
            size={30}
            style={{ marginLeft: "auto", marginRight: "auto" }}
            onPress={() => {
              setSecondStage(true);
            }}
          />
        ) : (
          <Text />
        )}
      </View>
      {secondStage ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {props.store.getTimesArray.map((times) => (
            <Button
              style={{
                width: "40%",
                marginTop: 30,
                marginRight: 10,
                padding: 5,
                color: "black",
                backgroundColor: times[1] === clicked ? "red" : "white",
              }}
              mode="text"
              key={times[0]}
              onPress={() => {
                setClicked(times[1]);
                setTime(times[0]);
              }}
              contentStyle={{ color: "white" }}
            >
              <Text
                style={{
                  fontSize: 25,
                }}
              >
                {times[0]}
              </Text>
            </Button>
          ))}
        </View>
      ) : (
        <View />
      )}
      <View>
        <Text
          style={{ marginTop: 10, marginLeft: "auto", marginRight: "auto" }}
        >
          Choice date:
        </Text>
        <Text
          style={{ marginTop: 10, marginLeft: "auto", marginRight: "auto" }}
        >
          {selectedDays ? Object.keys(selectedDays)[0] : ""}
        </Text>
        <Text
          style={{ marginTop: 10, marginLeft: "auto", marginRight: "auto" }}
        >
          Choice hour:
        </Text>
        <Text
          style={{ marginTop: 10, marginLeft: "auto", marginRight: "auto" }}
        >
          {visitTime}
        </Text>
        {loading === "false" ? (
          <View />
        ) : loading === "error" ? (
          <Text>Error</Text>
        ) : (
          <Picker
            style={{ marginTop: 30 }}
            selectedValue={pet}
            style={{
              height: 50,
              width: 150,
              marginLeft: "auto",
              marginRight: "auto",
            }}
            onValueChange={(itemValue, index) => setPet(itemValue)}
          >
            {userPets.map((p) => (
              <Picker.Item
                key={p._id}
                label={`${p.name}, age: ${p.age}`}
                value={p._id}
              />
            ))}
          </Picker>
        )}
      </View>
      {Object.keys(selectedDays).length > 0 && visitTime !== "" ? (
        <Button
          mode="contained"
          style={{
            marginBottom: 20,
          }}
          onPress={() => createVisitHandle()}
        >
          Create visit
        </Button>
      ) : (
        <View />
      )}
    </ScrollView>
  );
}
export default inject("store")(observer(CreateVisit));
