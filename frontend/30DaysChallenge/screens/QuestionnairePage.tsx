import {
  StyleSheet,
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable
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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


SplashScreen.preventAutoHideAsync();

interface LandingPageProps {
  navigation: any;
}

export default function LandingPage(props: LandingPageProps) {
  const [q1ChosenOption, setq1ChosenOption] = useState(null);
  const [q2ChosenOption, setq2ChosenOption] = useState(null);
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
  const questions = [
    '1. Question text goes here. This question is not very short. It is quite long actually. This is a multi-line question. ',
    '2. Question text goes here. ',
    '3. Question text goes here. This is a medium length question. ',
    '4. Question text goes here. This question is not very short. It is quite long actually. This is a multi-line question. ',
    '5. Question text goes here. '
  ];

  const q1Options = [
    { label: 'Yes', value: 'option1' },
    { label: 'No', value: 'option2' },
  ];

  const q2Options = [
    { label: 'Drinking', value: 'option1' },
    { label: 'Smoking', value: 'option2' },
    { label: 'Hard Drugs', value: 'option3' },
  ];

  const q3Options = [
    { label: 'Never', value: 'option1' },
    { label: 'Seldom', value: 'option2' },
    { label: 'Sometimes', value: 'option3' },
    { label: 'Frequently', value: 'option4' },
    { label: 'Always', value: 'option5' }
  ];

  return (
    // <DismissKeyboard>
    //   <KeyboardAvoidingView>
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
          <ScrollView style={styles.desc}> 
            <Text style={styles.text}>30 Days Challenge</Text>
              <View>
              {/* Question 1 */}
              <View style={styles.radiobuttons}>
              <Text style={styles.questionText}>{ questions.at(0) }<Text style={styles.grayText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={q1Options}
                  initial={0} //initial value of this group
                  buttonColor={"#F45D9A"}
                  labelColor={"white"}
                
                  onPress={(value) => {
                    setq1ChosenOption(value);
                  }}
                />
              </View>

              {/* Question 2 */}
              <View style={styles.radiobuttons}>
              <Text style={styles.questionText}>{ questions.at(1) }<Text style={styles.grayText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={q2Options}
                  initial={0} //initial value of this group
                  buttonColor={"#F45D9A"}
                  labelColor={"white"}
                  onPress={(value) => {
                    setq2ChosenOption(value);
                  }} 
                />
              </View>

              {/* Question 3 */}
              <View style={styles.radiobuttons}>
              <Text style={styles.questionText}>{ questions.at(2) }<Text style={styles.grayText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={q3Options}
                  initial={0} //initial value of this group
                  buttonColor={"#F45D9A"}
                  labelColor={"white"}
                  onPress={(value) => {
                    setq2ChosenOption(value);
                  }} 
                />
              </View>

              {/* Question 4 */}
              <View style={styles.radiobuttons}>
              <Text style={styles.questionText}>{ questions.at(3) }<Text style={styles.grayText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={q3Options}
                  initial={0} //initial value of this group
                  buttonColor={"#F45D9A"}
                  labelColor={"white"}
                  onPress={(value) => {
                    setq2ChosenOption(value);
                  }} 
                />
              </View>

              {/* Question 4 */}
              <View style={styles.radiobuttons}>
              <Text style={styles.questionText}>{ questions.at(4) }<Text style={styles.grayText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={q1Options}
                  initial={0} //initial value of this group
                  buttonColor={"#F45D9A"}
                  labelColor={"white"}
                  onPress={(value) => {
                    setq2ChosenOption(value);
                  }} 
                />
              </View>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
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
    top: 100,
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
    fontSize: 17,
    textAlign: "left",
    paddingRight: 10,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  grayText: {
      color: "#656668",
      fontFamily: "Inter_400Regular",
      fontSize: 17,
    }, 
    radiobuttons: {
      top: 95,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 10,
      paddingBottom: 10,
    },
    desc: {
      alignSelf: "center",
      alignContent: "center",
      position: "absolute",
      flexGrow: 1,
      // width: 327,
      height: 800,
      top: 50,
      // top: Platform.OS === "ios" ? 250 : 100,
      // backgroundColor: "#E6E6E6",
      // borderRadius: 6,
    }
});

