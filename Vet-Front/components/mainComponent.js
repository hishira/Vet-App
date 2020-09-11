import React from 'react'
import { View, Image, StyleSheet } from 'react-native';
import {Button} from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const styles = StyleSheet.create({
    
    button:{
        width:500,
        marginTop: 20,
        marginLeft:"auto",
        marginRight:"auto"
    }
})
export default function HomeComponent(props){
    return (
        <View>
            
            <Button style={styles.button} mode='contained' onPress={()=>props.navigation.navigate('Second')}>
                Go to other component
            </Button>
        </View>
    )
}