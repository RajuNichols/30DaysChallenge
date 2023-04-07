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
import * as backend from "../backendNew/backend";

SplashScreen.preventAutoHideAsync();
interface LandingPageProps {
  navigation: any;
}

export default function LandingPage(props: LandingPageProps) {
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

  const handleLogin = async() => {
    // #TODO
    // This is where we will use the backend to check the login values to see if they are valid, if so we will transition to the dashboard.

    const response = await backend.login(username, password);

    console.log(
      "username: " + username + " password: " + password,
      " this is the login information"
    );

    if(response){
      console.log("login success");
    } else {
      console.log("User does not exist");
    }
  };

  const handleRegister = () => {
    // #TODO
    // this is where we will transition the screen to the register screen.
    console.log("clicked on register");
    props.navigation.navigate("RegisterPage");
  };

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView>
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
          <Text style={styles.text}>30 Days Challenge</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={(val) => setUsername(val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(val) => setPassword(val)}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.register} onPress={handleRegister}>
            <Text style={styles.registerText}>
              New to 30 Days Challenge? Click here to register
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#123166",
    width: "100%",
    height: "100%",
    display: "flex",
  },
  text: {
    fontFamily: "Inter_800ExtraBold",
    color: "white",
    fontSize: 70,
    textAlign: "center",
    alignItems: "center",
    width: "100%",
    height: 300,
    position: "absolute",
    lineHeight: 105,
    top: 95,
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
});
