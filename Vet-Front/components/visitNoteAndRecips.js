import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { IconButton, ActivityIndicator } from "react-native-paper";
import { inject, observer } from "mobx-react";
import { getNoteByVisit } from "../api/noteApi";
import firebase from "../firebase";
function NoteRecipFromVisit(props) {
  const [loading, setLoading] = useState("false");
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const visitID = props.route.params.visitID;
        let obj = { visitID: visitID };
        setLoading("true");
        let user = firebase.auth().currentUser;
        const token = await user.getIdToken().then((res) => res);
        let data = await getNoteByVisit(obj, token).then((res) => {
          if (res.status === 200) return res.json();
          return false;
        });
        if (data === false) throw new Error("Server error");
        setNotes(data);
        setLoading("end");
      } catch (e) {
        setLoading("error");
      }
    };
    fetchData();
  }, [props.store.getVisitReload]);
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
          <Text>Error</Text>
        </View>
      ) : (
        <View>
         {notes.map(note=><Text>{note.content}</Text>)}
        </View>
      )}
    </ScrollView>
  );
}
export default inject("store")(observer(NoteRecipFromVisit));
