import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./screens/LandingPage";
import RegisterPage from "./screens/RegisterPage";
import ChallengeDescriptionPage from "./screens/ChallengeDescriptionPage";
import ListOfChallengesPage from "./screens/ListOfChallengesPage";
import ChallengeListItem from "./components/challengeListItem";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ListOfChallengesPage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen
          name="ChallengeDescriptionPage"
          component={ChallengeDescriptionPage}
        />
        <Stack.Screen name="ListOfChallengesPage" component={ListOfChallengesPage} />
        {/* <Stack.Screen name="ChallengeListItem" component={ChallengeListItem} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
