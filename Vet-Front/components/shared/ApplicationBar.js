import * as React from "react";
import { View, Image,Text } from "react-native";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
import { inject, observer } from "mobx-react";

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
  },
});

function MyComponent(props){
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content style={styles.title} title="Vet-App" />
        {
          props.store.getLoggedStatus?
        (<Appbar.Action style={{position: 'absolute',right:0}} icon="logout" onPress={()=>props.store.setLoggedUser(false)}/>):(<Text/>)
        }
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
