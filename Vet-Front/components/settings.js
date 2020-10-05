import React from 'react'
import {View,Text,ScrollView} from 'react-native'
import { IconButton } from "react-native-paper";

export default function UserSettings(props){
    return <ScrollView>
    <IconButton
      icon="arrow-left-bold"
      size={30}
      style={{ marginLeft: "auto", marginRight: "auto" }}
      onPress={() => props.navigation.navigate("User")}
    />
    
  </ScrollView>
}