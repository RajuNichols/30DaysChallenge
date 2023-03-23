import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../screens/LandingPage";
import RegisterPage from "../screens/RegisterPage";
import QuestionnairePage from "../screens/QuestionnairePage";

export default function LandingNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="RegisterPage" component={RegisterPage} />
      <Stack.Screen name="QuestionnairePage" component={QuestionnairePage} />
    </Stack.Navigator>
  );
}
