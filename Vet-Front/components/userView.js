import React, { useState } from "react";
import { View, ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph,IconButton } from "react-native-paper";
import { inject, observer } from "mobx-react";

function UserView(props) {
  const logoutHandle = async()=>{
    props.store.setLoggedUser(false)
  }
  return (
    <ScrollView>
      <IconButton icon='logout' style={{ position:"absolute",right:0,top:14}} onPress={()=>logoutHandle()}/>
      <View>
        <Avatar.Icon
          style={{ marginTop: 10, marginRight: "auto", marginLeft: "auto" }}
          size={54}
          icon="face"
        />
        <View
          style={{
            flexDirection: "row",
            padding: 20,
            marginTop: 30,
          }}
        >
          <Card
            style={{ flex: 0.5 }}
            onPress={() => {
              props.navigator
                ? props.navigator.navigate("UserPets")
                : props.navigation.navigate("UserPets");
            }}
          >
            <Card.Title
              title="Your pets"
              subtitle="Select your pets and reserve  visits in vet"
            />
            <Card.Cover
              source={{
                uri:
                  "https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              }}
            />
          </Card>
          <Card style={{ marginLeft: 25, flex: 0.5 }}
            onPress={() => {
              props.navigator
                ? props.navigator.navigate("OurClinics")
                : props.navigation.navigate("OurClinics");
            }}
          >
            <Card.Title title="Our Clinics" subtitle="Check clinics near by" />
            <Card.Cover
              source={{
                uri:
                  "https://images.pexels.com/photos/4074726/pexels-photo-4074726.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              }}
            />
          </Card>
        </View>
        <View
          style={{
            flexDirection: "row",
            padding: 20,
          }}
        >
          <Card
            onPress={() => {
              props.navigator
                ? props.navigator.navigate("Visits")
                : props.navigation.navigate("Visits");
            }}
            style={{ flex: 1,marginRight:25 }}
          >
            <Card.Title
              style={{}}
              title="Visits"
              subtitle="Your visits"
            />
            <Card.Cover
              source={{
                uri:
                  "https://cdn.pixabay.com/photo/2019/05/07/12/53/vet-4185908__340.jpg",
              }}
            />
          </Card>
          <Card
            onPress={() => {
              props.navigator
                ? props.navigator.navigate("UserSettings")
                : props.navigation.navigate("UserSettings");
            }}
            style={{ flex: 1 }}
          >
            <Card.Title
              style={{}}
              title="Settings"
              subtitle="change your account settings"
            />
            <Card.Cover
              source={{
                uri:
                  "https://images.pexels.com/photos/171198/pexels-photo-171198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
              }}
            />
          </Card>
        </View>
      </View>
    </ScrollView>
  );
}
export default inject("store")(observer(UserView))