import React, { useState } from "react";
import { View,ScrollView  } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";

export default function UserView(props) {
  return (
      <ScrollView>
    <View>
      <Avatar.Icon
        style={{ marginTop: 10, marginRight: "auto", marginLeft: "auto" }}
        size={54}
        icon="face"
      />
      <View
        style={{
            flexDirection:"row"  ,
          padding: 20,
          marginTop:30
        }}
      >
        <Card style={{ flex:.5 }}>
          <Card.Title
            title="Your pets"
            subtitle="Select your pets and reserve  visits in vet"
          />
          <Card.Cover source={{uri:"https://images.pexels.com/photos/46024/pexels-photo-46024.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}}/>
        </Card>
        <Card style={{ marginLeft:25,flex:.5 }}>
          <Card.Title title="Our Clinics" subtitle="Check clinics near by" />
          <Card.Cover source={{ uri: 'https://images.pexels.com/photos/4074726/pexels-photo-4074726.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} />

        </Card>
        </View>
        <View style={{
            flexDirection:"row"  ,
          padding: 20,
        }}>
        <Card onPress={()=>props.navigator.navigate("UserSettings")}
        style={{ flex:1 }}>
          <Card.Title style={{}} title="Settings" subtitle="change your account settings" />
          <Card.Cover source={{ uri: 'https://images.pexels.com/photos/171198/pexels-photo-171198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }} />
        </Card>
      </View>
    </View>
    </ScrollView>
  );
}
