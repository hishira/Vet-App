import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Dialog, Portal, Paragraph, Button } from "react-native-paper";
import { inject, observer } from "mobx-react";

function CancelVisitDialog(props) {
  return (
    <View>
      <Portal>
        <Dialog
          visible={props.store.getCancelVisitDialog}
          onDismiss={()=>props.store.setCancelVisit(false)}
        >
          <Dialog.Title>Are you sure?</Dialog.Title>
          <Dialog.Content>
  <Paragraph>{props.message}</Paragraph>
          </Dialog.Content>
          <Button
          
          onPress={()=>props.cancelvisitHandle(props.visitID)}>
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
