import React, { useState } from "react";
import {
  ScrollView,
  Text,
  Picker,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from "react-native";
import { IconButton, Card, Title, Paragraph, Button } from "react-native-paper";
import { getClinicByCity } from "../api/clinicApi";
import { getDoctorsbyClinic } from "../api/doctorApi";
import { inject, observer } from "mobx-react";

function OurClinics(props) {
  const [city, setCity] = useState("Kraków");
  const [loading, setLoading] = useState("false");
  const [clinics, setClinics] = useState([]);
  const [mode, setMode] = useState("clinic");
  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState("false");
  const {width,height} = Dimensions.get('window')
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: width,
      height: height,
    },
  });
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
  const showDoctorshandle = async (id) => {
    console.log(id);
    let obj = {
      clinicID: id,
    };
    setMode("doctor");
    setDoctorsLoading("true");
    try {
      let data = await getDoctorsbyClinic(obj).then((resp) => {
        if (resp.status === 200) return resp.json();
        return false;
      });
      if (data === false) throw new Error("error");
      setDoctors(data);
      setDoctorsLoading("false");
    } catch (e) {
      setDoctorsLoading("error");
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
  const mapViewHandle = (clinic)=>{
    let obj = {
      citylatitude: clinic.citylatitude,
      citylongitude: clinic.citylongitude,
      addresslatitude: clinic.addresslatitude,
      addresslongitude:clinic.addresslongitude
    }
    props.store.setMapInfo(obj)
    props.navigation.navigate("MapView")
  }
  return (
    <ScrollView style={{marginBottom:10}}>
      {mode === "clinic" ? (
        <View>
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
                color="blue"
                mode="contained"
                onPress={() => showClinicsHandle()}
              >
                Show clinics
              </Button>
            </View>
          ) : (
            <View />
          )}
          {loading === "false" ? (
            <View />
          ) : loading === "end" ? (
            <View style={{padding:10}}>
              {clinics.map((clinic) => (
                <Card key={clinic._id} style={{ marginTop: 10, height: 100 }}>
                  <Card.Content style={{ width: "45%" }}>
                    <Title>{clinic.city}</Title>
                    <Paragraph>{clinic.address}</Paragraph>
                  </Card.Content>
                  <Card.Actions
                    style={{ position: "absolute", right: 0, top: "25%" }}
                  >
                    <Button onPress={() => showDoctorshandle(clinic._id)}>
                      See doctors
                    </Button>
                    <Button onPress={() => mapViewHandle(clinic)}>See on map</Button>
                  </Card.Actions>
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
        </View>
      ) : (
        <View>
          <IconButton
            icon="arrow-left-bold"
            size={30}
            style={{ marginLeft: "auto", marginRight: "auto" }}
            onPress={() => setMode("clinic")}
          />
          {doctorsLoading === "true" ? (
            <ActivityIndicator size="large" />
          ) : doctorsLoading === "false" ? (
            <View>
              {doctors.map((doctor) => (
                <Card key={doctor._id} style={{ marginTop: 10 }}>
                  <Card.Content>
                    <Title>{`${doctor.name} ${doctor.lastName}`}</Title>
                    <Paragraph>Phone number: {doctor.phoneNumber}</Paragraph>
                    <Paragraph>Doctor to: {doctor.animalCareType}</Paragraph>
                  </Card.Content>
                </Card>
              ))}
            </View>
          ) : (
            <Text>Error</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

export default inject("store")(observer(OurClinics))