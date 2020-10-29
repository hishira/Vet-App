import * as React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { name as appName } from "./app.json";
import ApplicationBar from "./components/shared/ApplicationBar";
import MainComponent from "./components/mainComponent.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SecondView from "./components/secondView";
import { Provider } from "mobx-react";
import store from "./store/mainStore";
import SignUpview from "./components/signup";
import UserView from "./components/userView";
import UserSetings from "./components/settings";
import UserPets from "./components/userPets";
import AddPet from "./components/addpet";
import UserVisits from "./components/userVisits";
import CreateVisit from "./components/createVisit";
import OurClinics from './components/ourClinics'
import ClinicMapView from './components/clinicMapView'
import PetClinicHistory from './components/petClinicHistory'
import EditPet from './components/editPet'
import DoctorInfoView from './components/doctorInfoView'

const Stack = createStackNavigator();
export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <ApplicationBar />
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={MainComponent} />
            <Stack.Screen name="User" component={UserView} />
            <Stack.Screen name="SignUp" component={SignUpview} />
            <Stack.Screen name="UserSettings" component={UserSetings} />
            <Stack.Screen name="UserPets" component={UserPets} />
            <Stack.Screen name="AddPet" component={AddPet} />
            <Stack.Screen name="Visits" component={UserVisits} />
            <Stack.Screen name="CreateVisit" component={CreateVisit} />
            <Stack.Screen name='OurClinics' component={OurClinics} />
            <Stack.Screen name='MapView' component={ClinicMapView} />
            <Stack.Screen name='PetClinicHistory' component={PetClinicHistory}/>
            <Stack.Screen name='EditPet' component={EditPet}/>
            <Stack.Screen name='DoctorInfo' component={DoctorInfoView}/>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
