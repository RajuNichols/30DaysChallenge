import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "./screens/LandingPage";
import RegisterPage from "./screens/RegisterPage";
import QuestionnairePage from "./screens/QuestionnairePage";
import ChallengeDescriptionPage from "./screens/ChallengeDescriptionPage";
import ListOfChallengesPage from "./screens/ListOfChallengesPage";
import ChallengeListItem from "./components/challengeListItem";
import UserDashboardPage from "./screens/UserDashboardPage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "./colors";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator()

function HomeStack(){
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: any;

            if (route.name === 'Dashboard') {
              iconName = focused
                ? "ios-home-sharp"
                : "ios-home-outline";
            }
            if(route.name === "Challenge Search"){
              iconName = focused
                ? "ios-search-sharp"
                : "ios-search-outline";
            }


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: COLORS.blue,
          tabBarInactiveTintColor: 'gray',
        })}
      >
      <Tab.Screen name="Dashboard" component={UserDashboardPage} />
      <Tab.Screen name="Challenge Search" component={ListOfChallengesPage} />
    </Tab.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={"LandingPage"} component={LandingPage}/>
        <Stack.Screen name={"RegisterPage"} component={RegisterPage}/>
        <Stack.Screen name={"QuestionnairePage"} component={QuestionnairePage}/>
        <Stack.Screen name={"ChallengeDescriptionPage"} component={ChallengeDescriptionPage}/>
        <Stack.Screen name="Home" component={HomeStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
