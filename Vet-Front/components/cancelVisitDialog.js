import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Dialog, Portal, Paragraph, Button } from "react-native-paper";
import { inject, observer } from "mobx-react";
import {deleteVisitByID} from '../api/visitApi'
import firebase from '../firebase'
function CancelVisitDialog(props) {
    const cancelvisitHandle = async()=>{
        console.log(props.visitID)
        let user = firebase.auth().currentUser
        let token = await user.getIdToken().then(res=>res)
        let obj = {
            visitID: props.visitID
        }
        console.log(token)
        let data = await deleteVisitByID(obj,token).then(res=>{
            if(res.status === 200)
                return true
            return false
        })
        if(data){
            props.store.setVisitReload(!props.store.getVisitReload)
            props.store.setCancelVisit(false)
        }
    }
  return (
    <View>
      <Portal>
        <Dialog
          visible={props.store.getCancelVisitDialog}
          onDismiss={()=>props.store.setCancelVisit(false)}
        >
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Dou you wana delete visit?</Paragraph>
          </Dialog.Content>
          <Button
          
          onPress={()=>cancelvisitHandle()}>
              Yes
          </Button>
          <Button
          onPress={()=>props.store.setCancelVisit(false)}>
              No
              </Button>
        </Dialog>
      </Portal>
    </View>
  );
}
export default inject("store")(observer(CancelVisitDialog));
