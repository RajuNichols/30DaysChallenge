import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./screens/LandingPage";
import RegisterPage from "./screens/RegisterPage";
import QuestionnairePage from "./screens/QuestionnairePage";
import ChallengeDescriptionPage from "./screens/ChallengeDescriptionPage";
import UserDashboardPage from "./screens/UserDashboardPage";


export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="UserDashboardPage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="UserDashboardPage" component={UserDashboardPage}/>
        <Stack.Screen
          name="ChallengeDescriptionPage"
          component={ChallengeDescriptionPage}
        />
        <Stack.Screen name="QuestionnairePage" component={QuestionnairePage} />
        <Stack.Screen name="ChallengeDescriptionPage" component={ChallengeDescriptionPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
