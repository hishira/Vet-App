import React, { useState } from "react";
import {
  ScrollView,
  Text,
  Picker,
  Button,
  View,
  ActivityIndicator,
} from "react-native";
import { IconButton, Card, Title, Paragraph } from "react-native-paper";
import { getClinicByCity } from "../api/clinicApi";
export default function OurClinics(props) {
  const [city, setCity] = useState("Kraków");
  const [loading, setLoading] = useState("false");
  const [clinics, setClinics] = useState([]);
  const showClinicsHandle = async () => {
    let obj = {
      city: city,
    };
    console.log(obj);
    setLoading("true");
    let data = await getClinicByCity(obj).then((res) => {
      if (res.status === 200) return res.json();
      return false;
    });
    if (data === false) {
      setLoading("error");
      return;
    } else {
      setLoading("end");
      setClinics(data);
    }
  };
  const cities = [
    {
      key: 1,
      label: "Kraków",
      value: "Kraków",
    },
    {
      key: 2,
      label: "Warszawa",
      value: "Warszawa",
    },
    {
      key: 3,
      label: "Sopot",
      value: "Sopot",
    },
    {
      key: 4,
      label: "Gdańsk",
      value: "Gdańsk",
    },
    {
      key: 5,
      label: "Wrocław",
      value: "Wrocław",
    },
  ];
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
          marginRight: "auto",
          marginLeft: "auto",
          fontSize: 20,
        }}
      >
        Choice your city
      </Text>
      <Picker
        style={{
          marginTop: 30,
          height: 50,
          width: 150,
          marginLeft: "auto",
          marginRight: "auto",
        }}
        selectedValue={city}
        onValueChange={(itemValue, index) => setCity(itemValue)}
      >
        {cities.map((c) => (
          <Picker.Item key={c.key} label={c.label} value={c.value} />
        ))}
      </Picker>
      {city !== "" ? (
        <View
          style={{
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Button
            title="Show clinics"
            color="blue"
            onPress={() => showClinicsHandle()}
          />
        </View>
      ) : (
        <View />
      )}
      {loading === "false" ? (
        <View />
      ) : loading === "end" ? (
        <View>
          {clinics.map((clinic) => (
            <Card key={clinic._id} style={{marginTop:10}}>
              <Card.Content>
                <Title>{clinic.city}</Title>
                <Paragraph>{clinic.address}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </View>
      ) : loading === "true" ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <Text>Error</Text>
        </View>
      )}
    </ScrollView>
  );
}
