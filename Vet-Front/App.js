import * as React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import ApplicationBar from "./components/shared/ApplicationBar";
import MainComponent from "./components/mainComponent.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SecondView from './components/secondView'
const Stack = createStackNavigator();
export default function Main() {
  return (
    <PaperProvider>
      <ApplicationBar />
      <NavigationContainer>
        <Stack.Navigator headerMode="none">
          <Stack.Screen
            name="Home"
            component={MainComponent}
          />
          <Stack.Screen
          name="Second"
          component={SecondView}/>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
