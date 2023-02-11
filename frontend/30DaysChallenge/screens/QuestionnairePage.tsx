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
    Inter_700Bold
  } from "@expo-google-fonts/inter";
  import React, { useEffect, useCallback, ReactNode, useState } from "react";
  import * as SplashScreen from "expo-splash-screen";
  import { RadioButton } from 'react-native-paper';
  
  SplashScreen.preventAutoHideAsync();
  
  interface DissmissKeyboardProps {
    children?: ReactNode;
  }
  const DismissKeyboard = ({ children }: DissmissKeyboardProps) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
  interface LandingPageProps {
    navigation: any;
  }
  
  export default function LandingPage(props: LandingPageProps) {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const [checked, setChecked] = React.useState('first');
    let [fontsLoaded, error] = useFonts({
      Inter_900Black,
      Inter_800ExtraBold,
      Inter_400Regular,
      Inter_700Bold
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
  
    return (
      <DismissKeyboard>
        <KeyboardAvoidingView>
          <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.inputContainer}>
            <Text style={styles.text}>30 Days Challenge</Text>
            <Text style={styles.questionText}>1. Question text goes here. This question is not very short. It is quite long actually. This is a multi-line question. <Text style={styles.grayText}>Select one option.</Text></Text>
            <RadioButton 
                // style={styles.radioButton}
                value="first"
                status={ checked === 'first' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('first')}
            />
            <RadioButton 
                // style={styles.radioButton}
                value="second"
                status={ checked === 'second' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('second')}
            />
            </View>
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
      top: 5,
    },
    inputContainer: {},
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
    questionText: {
      color: "#FFFFFF",
      fontFamily: "Inter_700Bold",
      alignSelf: "center",
      fontSize: 17,
      textAlign: "left",
      paddingLeft: 10,
      paddingRight: 10,
      fontWeight: "bold",
      top: 120,
    },
    grayText: {
        color: "#656668",
        fontFamily: "Inter_400Regular",
        fontSize: 17,
      }, 
      radioButton: {
        // color: "#656668",
        // top: 500
      }
  });
  