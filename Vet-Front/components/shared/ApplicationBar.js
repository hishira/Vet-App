import * as React from "react";
import { View, Image,Text } from "react-native";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { inject, observer } from "mobx-react";
import {useNavigation} from '@react-navigation/native'
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    position: "absolute",
    right: "50%",
    transform:[{translateX:45},{translateY:0}]
  },
  logo:{
    width: "100%",
    height: 280,
  },
  textStyle:{
    position:"absolute",
    top:"50%",
    color:"coral",
    fontSize:30,
    left:"30%",
    transform:[{translateX:0},{translateY:0}]
  },
});


function MyComponent(props){
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content style={styles.title} title="Vet-App" />
      </Appbar.Header>
      <Image
        source={{
          uri:
            "https://images.unsplash.com/photo-1502051897604-58025075ce54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
        }}
        style={styles.logo}
      />
      <Text style={styles.textStyle}>Care your pet</Text>
    </View>
  );
};

export default inject("store")(observer(MyComponent));
