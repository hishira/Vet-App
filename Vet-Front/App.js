import * as React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import ApplicationBar from "./components/shared/ApplicationBar";
import MainComponent from "./components/mainComponent.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SecondView from './components/secondView'
import {Provider} from 'mobx-react'
import store from './store/mainStore'
import SignUpview from './components/signup'
import UserView from './components/userView'
import UserSetings from './components/settings'

const Stack = createStackNavigator();
export default function Main() {
  return (
    <Provider store={store}>
    <PaperProvider>
      <ApplicationBar />
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen
            name="Home"
            component={MainComponent}
          />
          <Stack.Screen
          name="User"
          component={UserView}/>
          <Stack.Screen
          name="SignUp"
          component={SignUpview}/>
          <Stack.Screen
          name="UserSettings"
          component={UserSetings}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
