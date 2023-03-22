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
import { COLORS } from "../colors";

SplashScreen.preventAutoHideAsync();

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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

  const handleRegister = () => {
    // #TODO
    // This is where we will use the backend to check the register values to see if they are valid, if so we will transition to the questionnaire.

    // Check that the user entered something for each input
    if (username == "") {
      setErrorMessage("Enter a username.");
    } else if (email == "") {
      setErrorMessage("Enter an email.");
    } else if (password == "") {
      setErrorMessage("Enter a password");
    }

    // Check that email and passwords are valid
    else if (!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)) {
      setErrorMessage("Enter a valid email.");
    } else if (password != checkPassword) {
      setErrorMessage("The passwords do not match.");
    } else {
      setErrorMessage("");
    }

    console.log(
      "Name: " +
        username +
        "\n" +
        "Email: " +
        email +
        "\n" +
        "Password: " +
        password +
        "\n" +
        "Verify Pass: " +
        checkPassword +
        "\n"
    );
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
              selectionColor={COLORS.black} 
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={(val) => setEmail(val)}
              selectionColor={COLORS.black} 
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(val) => setPassword(val)}
              selectionColor={COLORS.black} 
            />
            <TextInput
              style={styles.input}
              placeholder="Verify Password"
              secureTextEntry={true}
              value={checkPassword}
              onChangeText={(val) => setCheckPassword(val)}
              selectionColor={COLORS.black} 
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.error}>{errorMessage}</Text>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: "100%",
    height: "100%",
    display: "flex",
  },
  text: {
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.black,
    fontSize: 30,
    textAlign: "center",
    alignItems: "center",
    width: "100%",
    height: 300,
    position: "absolute",
    lineHeight: 105,
    top: 95,
  },
  inputContainer: {
    top: Platform.OS === "ios"? 0 : 70,
  },
  input: {
    height: 44,
    width: 327,
    fontFamily: "Inter_400Regular",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    top: Platform.OS === "ios" ? 125 : 100,
    alignSelf: "center",
    borderRadius: 4,
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  button: {
    backgroundColor: COLORS.green,
    width: 327,
    height: 44,
    top: Platform.OS === "ios" ? 150: 200,
    alignSelf: "center",
    borderRadius: 4,
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Inter_400Regular",
    alignSelf: "center",
    fontSize: 17,
  },
  error: {
    color: COLORS.red,
    fontFamily: "Inter_400Regular",
    alignSelf: "center",
    fontSize: 15,
    textAlign: "center",
    top: Platform.OS === "ios"? 80: 125,
  },
});
