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

SplashScreen.preventAutoHideAsync();

interface Props {
  children?: ReactNode;
}

const DismissKeyboard = ({ children }: Props) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

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
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              keyboardType="email-address"
              onChangeText={(val) => setEmail(val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              value={password}
              onChangeText={(val) => setPassword(val)}
            />
            <TextInput
              style={styles.input}
              placeholder="Verify Password"
              secureTextEntry={true}
              value={checkPassword}
              onChangeText={(val) => setCheckPassword(val)}
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
    backgroundColor: "#123166",
    width: "100%",
    height: "100%",
    display: "flex",
  },
  text: {
    fontFamily: "Inter_800ExtraBold",
    color: "white",
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
    top: 100,
  },
  input: {
    height: 44,
    width: 327,
    fontFamily: "Inter_400Regular",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    top: 130,
    alignSelf: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#F45D9A",
    width: 327,
    height: 44,
    top: 250,
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
  error: {
    color: "#FF0000",
    fontFamily: "Inter_400Regular",
    alignSelf: "center",
    fontSize: 15,
    textAlign: "center",
    top: 180,
  },
});
