import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { inject, observer } from "mobx-react";
import firebase from "../firebase";

function LoginView(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandle = async () => {
    //props.store.setLoggedUser(true)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {});
    let user = firebase.auth().onAuthStateChanged((user) => {
      if (user) props.store.setLoggedUser(true);
      else console.log("Nie");
    });
  };
  const signUpHandle = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.navigator.navigate("SignUp");
        props.store.setLoggedUser(false);
      })
      .catch((err) => console.log("problem with singout"));
  };
  return (
    <View
      style={{
        width: "50%",
        marginRight: "auto",
        marginLeft: "auto",
        marginTop: 25,
      }}
    >
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 0.5,
          borderRadius: 15,
          padding: 5,
        }}
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 0.5,
          borderRadius: 15,
          padding: 5,
          marginTop:15
        }}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(password) => setPassword(password)}
      />
      <Button
        mode="contained"
        style={{ marginTop: 30, marginBottom: 10 }}
        onPress={() => loginHandle()}
      >
        Login
      </Button>
      <Text style={{ textAlign: "center" }}>Or</Text>
      <Button
        mode="contained"
        style={{ marginTop: 10 }}
        onPress={() => signUpHandle()}
      >
        SignUp
      </Button>
    </View>
  );
}
export default inject("store")(observer(LoginView));
