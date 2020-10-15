import React, { useEffect, useState } from "react";
import { ScrollView, Button, View, Text,ActivityIndicator } from "react-native";
import {IconButton,Card} from 'react-native-paper'
import { getPetByID } from "../api/petApi";
import firebase from "../firebase";
import {inject,observer} from 'mobx-react'

function PetClinicHistory(props) {
  const [pet, setPet] = useState({});
  const [loading, setLoading] = useState("false");
  useEffect(() => {
    const fetchData = async () => {
      let user = firebase.auth().currentUser;
      let token = ""
      try{
       token = await user.getIdToken().then((res) => res);
      }catch(e){
          setLoading("error")
          return
      }
      if(token === ""){
        setLoading("error")
        return
      }
      let obj = {
        petID: props.route.params.petID,
      };
      console.log(token);
      try {
        setLoading("true");
        let data = await getPetByID(obj, token).then((res) => {
          if (res.status === 200) return res.json();
          return false;
        });
        if (data === false) throw new Error("err");
        setPet(data);
        setLoading("end");
        console.log(data);
      } catch (e) {
        setLoading("error");
      }
    };
    fetchData()
  }, [props.store.getVisitReload]);
  return (
    <ScrollView>
        <IconButton
          icon="arrow-left-bold"
          size={30}
          style={{ marginLeft: "auto", marginRight: "auto" }}
          onPress={() => props.navigation.navigate("UserPets")}
        />
      {loading === "false" ? (
        <View></View>
      ) : loading === "error" ? (
        <Text>Error</Text>
      ) : loading === "true"?(
          <ActivityIndicator size='large'/>
      ): (
        <ScrollView>
            <Text>{pet.name} visit history</Text>
            {
                pet.visitHistory.map(hist=><Card>
                    <Card.Title title={hist.when.split("T")[0]} subtitle={hist.time}/>
                </Card>)
            }
        </ScrollView>
      )}
    </ScrollView>
  );
}

export default inject("store")(observer(PetClinicHistory))