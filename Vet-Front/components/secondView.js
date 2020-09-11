import React from 'react'
import {View,Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {inject,observer} from 'mobx-react'
function SecondView(props){
    return(
        <View>
            <Text>Second component</Text>
        </View>
    )
}
export default inject("store")(observer(SecondView))