import * as React from "react";
import { View, Image } from "react-native";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    position: "absolute",
    right: 0,
  },
  logo:{
    width: "100%",
    height: 500
},
});

const MyComponent = () => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content styles={styles.title} title="Vet-App" />
        <Appbar.Action icon="dots-vertical" />
      </Appbar.Header>
      <Image
        source={{
          uri:
            "https://upload.wikimedia.org/wikipedia/commons/4/47/American_Eskimo_Dog.jpg",
        }}
        style={styles.logo}
      />
    </View>
  );
};

export default MyComponent;
