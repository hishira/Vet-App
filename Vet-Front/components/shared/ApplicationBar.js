import * as React from "react";
import { View, Image,Text } from "react-native";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    position: "absolute",
    right: "50%",
  },
  logo:{
    width: "100%",
    height: 300,
  },
  textStyle:{
    position:"absolute",
    top:"50%",
    color:"coral",
    fontSize:30,
    left:"38%"
  }
});

const MyComponent = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content style={styles.title} title="Vet-App" />
        <Appbar.Action icon="dots-vertical" />
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

export default MyComponent;
