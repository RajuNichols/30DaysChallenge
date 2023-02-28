import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import {
  useFonts,
  Inter_900Black,
  Inter_800ExtraBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import React, { useEffect, useCallback, ReactNode, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import DismissKeyboard from "../components/dismisskeyboard";
import DifficultyStars from "../components/difficultystars";

SplashScreen.preventAutoHideAsync();
interface ListOfChallengesPageProps {
  navigation: any;
}

export default function ListOfChallengesPage(props: ListOfChallengesPageProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let [fontsLoaded, error] = useFonts({
    Inter_900Black,
    Inter_800ExtraBold,
    Inter_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

//   const handleLogin = () => {
//     // #TODO
//     // This is where we will use the backend to check the login values to see if they are valid, if so we will transition to the dashboard.

//     console.log(
//       "username: " + username + " password: " + password,
//       " this is the login information"
//     );
//   };

//   const handleRegister = () => {
//     // #TODO
//     // this is where we will transition the screen to the register screen.
//     console.log("clicked on register");
//     props.navigation.navigate("RegisterPage");
//   };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView>
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
          <Text style={styles.text}>New Challenges</Text>
          <View style={styles.searchBar}><Text>Search</Text></View>
          <ScrollView> 
            <View style={styles.challengeContainer}>
              <Text style={styles.challengeName}>Challenge Name</Text>
              <View style={styles.stars}>
                <DifficultyStars difficulty={4}></DifficultyStars>
              </View>
            </View>
            <View style={styles.challengeContainer}>
              <Text style={styles.challengeName}>Challenge Name</Text>
              <View style={styles.stars}>
                <DifficultyStars difficulty={1}></DifficultyStars>
              </View>
            </View>
            <View style={styles.challengeContainer}>
              <Text style={styles.challengeName}>Challenge Name</Text>
              <View style={styles.stars}>
                <DifficultyStars difficulty={2}></DifficultyStars>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3F5F6",
    width: "100%",
    height: "100%",
    display: "flex",
  },
  text: {
    alignSelf: "center",
    fontFamily: "Inter_800ExtraBold",
    color: "#020202",
    fontSize: 30,
    top: 60,
  },
  inputContainer: {},
  input: {
    height: 44,
    width: 327,
    fontFamily: "Inter_400Regular",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    top: 439,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#F45D9A",
    width: 327,
    height: 44,
    top: 449,
    alignSelf: "center",
    borderRadius: 4,
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
    alignSelf: "center",
    fontSize: 17,
  },
  register: {
    width: 327,
    height: 48,
    top: 459,
    justifyContent: "center",
    textAlign: "center",
  },
  registerText: {
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
    alignSelf: "center",
    fontSize: 17,
    textAlign: "center",
    left: 35,
  },
  stars: {
    // alignItems: "center",
    // paddingLeft: 5,
    // backgroundColor: "blue",
    // position: "absolute",
    width: 50,

    // top: 90,
  },
  searchBar: {
    marginTop: 80,
    position: "relative",
    height: 30,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 7,
    paddingLeft: 10,
  },
  challengeContainer: {
    position: "relative",
    marginTop: 10,
    height: 80,
    width: "80%",
    alignSelf: "center",
    // top: 80,
    backgroundColor: "#0D9968",
    borderRadius: 10,
    paddingTop: 7,
    paddingLeft: 10,
  },
  desc: {
    alignSelf: "center",
    alignContent: "center",
    position: "absolute",
    width: 327,
    height: 295,
    top: Platform.OS === "ios" ? 250 : 100,
    backgroundColor: "#E6E6E6",
    borderRadius: 6,
  },
  challengeName: {
    fontFamily: "Inter_800ExtraBold",
    color: "white",
    paddingTop: 5,
    paddingLeft: 5,
    fontSize: 20,
    // top: 60,
  }
});
