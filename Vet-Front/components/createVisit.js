import React, { useState, useEffect } from "react";
import { View, Text, Picker } from "react-native";
import { Button, Card, Title, Paragraph } from "react-native-paper";
import { IconButton } from "react-native-paper";
import { getUserPets } from "../api/petApi";
import firebase from "../firebase";
import { Calendar } from "react-native-calendars";
import DateTimePicker from "@react-native-community/datetimepicker";
export default function CreateVisit(props) {
  const [loading, setLoading] = useState("false");
  const [selectedDays, setSelectedDays] = useState({});
  const [secondStage, setSecondStage] = useState(false);
  const [visitTime, setTime] = useState("");
  const [userPets, setUserPets] = useState([]);
  const [pet, setPet] = useState("");
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
  return (
    <View>
      <IconButton
        icon="arrow-left-bold"
        size={30}
        style={{ marginLeft: "auto", marginRight: "auto" }}
        onPress={() => props.navigation.navigate("Visits")}
      />
      <View>
        <Calendar
          markedDates={selectedDays}
          // Initially visible month. Default = Date()
          current={"2020-09-23"}
          // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
          minDate={"2020-09-01"}
          // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
          maxDate={"2020-10-30"}
          // Handler which gets executed on day press. Default = undefined
          onDayPress={(day) => {
            console.log("selected day", day);
            let choiceDay = `${day.dateString}`;
            let obj = {};
            obj[choiceDay] = { selected: true, color: "blue" };
            setSelectedDays(obj);
            setSecondStage(true);
          }}
          // Handler which gets executed on day long press. Default = undefined
          onDayLongPress={(day) => {
            console.log("selected", day);
          }}
          // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
          monthFormat={"yyyy MM"}
          // Handler which gets executed when visible month changes in calendar. Default = undefined
          onMonthChange={(month) => {
            console.log("month changed", month);
          }}
          // Hide month navigation arrows. Default = false
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month

          // Replace default month and year title with custom one. the function receive a date as parameter.
          renderHeader={(date) => {
            /*Return JSX*/
          }}
          // Enable the option to swipe between months. Default = false
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
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            mode={"time"}
            value={new Date(Object.keys(selectedDays)[0])}
            is24Hour={true}
            display="spinner"
            timeZoneOffsetInMinutes={2 * 60}
            minuteInterval={15}
            onChange={(event, time) => {
              let timeCC = time;
              timeCC = timeCC.setHours(timeCC.getHours() + 2);
              timeCC = new Date(timeCC);
              console.log(`${timeCC.getUTCHours()}:${timeCC.getUTCMinutes()}`);
              timeCC = timeCC.toUTCString();
              setTime(timeCC);
              setSecondStage(false);
            }}
          />
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
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, index) => setPet(itemValue)}
          >
            {userPets.map((p) => (
              <Picker.Item label={p.name} value={p.name} />
            ))}
          </Picker>
        )}
      </View>
      {Object.keys(selectedDays).length > 0 && visitTime !== "" ? (
        <Button>Create visit</Button>
      ) : (
        <View />
      )}
    </View>
  );
}
