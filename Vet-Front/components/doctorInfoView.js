import React, { useState } from "react";
import { ScrollView, Text, View, Image } from "react-native";
import { Button } from "react-native-paper";
import { IconButton } from "react-native-paper";
export default function DoctorInfoView(props) {
  const [doctor, setDoctor] = useState(props.route.params.doctor);
  const [uri, setUri] = useState(props.route.params.doctor.photoarray[0]);
  const [index, setIndex] = useState(0);
  const nextPhoto = () => {
    if (index + 1 >= doctor.photoarray.length) setIndex(0);
    else setIndex(index + 1);
    setUri(doctor.photoarray[index]);
  };
  const previousPhoto = () => {
    if (index - 1 < 0) setIndex(doctor.photoarray.length - 1);
    else setIndex(index - 1);
    setUri(doctor.photoarray[index]);
  };
  return (
    <ScrollView>
      <IconButton
        icon="arrow-left-bold"
        size={30}
        style={{ marginLeft: "auto", marginRight: "auto" }}
        onPress={() => props.navigation.navigate("OurClinics")}
      />
      <View>
        <Image
          style={{ width: "100%", position: "relative", height: 200 }}
          source={{ uri: uri }}
        />
        <Text style={{ padding: 15, lineHeight: 25, fontSize: 18 }}>
          {doctor.moreinfo}
        </Text>
        <IconButton
          icon="arrow-left-bold"
          size={30}
          color="red"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            position: "absolute",
            top:70
          }}
          onPress={() => {
            previousPhoto();
          }}
        />
        <IconButton
          icon="arrow-right-bold"
          size={30}
          color="red"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            position: "absolute",
            right: 0,
            top:70
          }}
          onPress={() => {
            nextPhoto();
          }}
        />
      </View>
    </ScrollView>
  );
}
