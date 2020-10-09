import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { inject, observer } from "mobx-react";
import { IconButton } from "react-native-paper";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

function ClinicMapView(props) {
  console.log(props.store.getMapInfo)
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    mapStyle: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
  });
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        initialRegion={{
          latitude: props.store.getMapInfo.citylatitude,
          longitude: props.store.getMapInfo.citylongitude,
          latitudeDelta: 0.1022,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: props.store.getMapInfo.addresslatitude, longitude: props.store.getMapInfo.addresslongitude }} />
      </MapView>
      <IconButton
        icon="arrow-left-bold"
        size={30}
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          position: "absolute",
          top: 0,
          left: 0,
        }}
        onPress={() => props.navigation.navigate("OurClinics")}
      />
    </View>
  );
}
export default inject("store")(observer(ClinicMapView));
