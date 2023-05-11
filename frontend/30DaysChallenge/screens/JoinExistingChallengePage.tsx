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
  import { COLORS } from "../colors";
  import * as backend from "../backendNew/backend";
  
  SplashScreen.preventAutoHideAsync();
  interface JoinExistingChallengePageProps {
    navigation: any;
  }
  
  export default function JoinExistingChallengePage(props: JoinExistingChallengePageProps) {
    const [code, setCode] = useState("");
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

    const handleJoinChallenge = () => {
        console.log("Code entered: " + code);
        if (code) {
            // Navigate to the dashboard where the new challenge should be now
            var check = backend.addChallengeWithCode(code);
            setErrorMessage("");
            props.navigation.navigate("Dashboard");
        }else{
          setErrorMessage("Invalid group code.");
        }
      };
  
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Insert the group code below to join a friend's challenge</Text>
            <TextInput
            style={styles.input}
            placeholder="Code"
            value={code}
            onChangeText={(val) => setCode(val)}
            selectionColor={COLORS.black}       
            />
            <Text style={styles.error}>{errorMessage}</Text>
            <TouchableOpacity style={styles.button} onPress={handleJoinChallenge}>
                <Text style={styles.buttonText}>Join Challenge</Text>
            </TouchableOpacity>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
        container: {
          backgroundColor: COLORS.white,
          width: "80%",
          height: "100%",
          display: "flex",
          alignSelf: "center"

        },
        text: {
          fontFamily: "Inter_800ExtraBold",
          color: COLORS.black,
          fontSize: 25,
          textAlign: "center",
          alignSelf: "center",
          alignItems: "center",
          width: "100%",
          position: "absolute",
          top: 100,
        },
        input: {
            height: 44,
            width: 327,
            fontFamily: "Inter_400Regular",
            margin: 12,
            borderWidth: 1,
            padding: 10,
            top: 200,
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
            top: 200,
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
            color: COLORS.white,
            fontFamily: "Inter_400Regular",
            alignSelf: "center",
            fontSize: 17,
          },
          error:{
            color:COLORS.red,
            fontFamily: "Inter_400Regular",
            fontSize: 14,
            textAlign: "center",
            top: 195
          }
        });
  