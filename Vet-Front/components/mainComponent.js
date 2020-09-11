import React from 'react'
import { View, Image, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginView from './loginView'
import SecondView from './secondView'
import { inject, observer } from "mobx-react";

const styles = StyleSheet.create({
    
    button:{
        width:500,
        marginTop: 20,
        marginLeft:"auto",
        marginRight:"auto"
    }
})
function HomeComponent(props){
    return (
        <View>
            {
                props.store.getLoggedStatus? (<SecondView/>):(<LoginView/>)
            }
        </View>
    )
}
export default inject("store")(observer(HomeComponent));
