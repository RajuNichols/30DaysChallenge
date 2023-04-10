import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
import {
  useFonts,
  Inter_900Black,
  Inter_800ExtraBold,
  Inter_400Regular,
  Inter_700Bold
} from "@expo-google-fonts/inter";
import React, { useEffect, useCallback, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import RadioForm from 'react-native-simple-radio-button';
import 'core-js/features/array/at';
import { COLORS } from "../colors";

SplashScreen.preventAutoHideAsync();

interface QuestionnairePageProps {
  navigation: any;
}

export default function QuestionnairePage(props: QuestionnairePageProps) {
  const [q1ChosenOption, setq1ChosenOption] = useState(null);
  const [q2ChosenOption, setq2ChosenOption] = useState(null);
  const [q3ChosenOption, setq3ChosenOption] = useState(null);
  const [q4ChosenOption, setq4ChosenOption] = useState(null);
  const [q5ChosenOption, setq5ChosenOption] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
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

  const yesNoOptions = [
    { label: 'Yes', value: 'option1' },
    { label: 'No', value: 'option2' },
  ];
  const scaleOptions = [
    { label: 'Never', value: 'option1' },
    { label: 'Seldom', value: 'option2' },
    { label: 'Sometimes', value: 'option3' },
    { label: 'Frequently', value: 'option4' },
    { label: 'Always', value: 'option5' }
  ];
  const customOptions1 = [
    { label: 'Drinking', value: 'option1' },
    { label: 'Smoking', value: 'option2' },
    { label: 'Hard Drugs', value: 'option3' },
  ];


  const handleSubmit = () => {
    // #TODO
    // This is where we will use the backend to check the login values to see if they are valid, if so we will transition to the dashboard.

    if (q1ChosenOption && q2ChosenOption && q3ChosenOption && q4ChosenOption && q5ChosenOption)
    {
      console.log(
        "User answers:\n" +
        "Q1: " + q1ChosenOption + "\n" +
        "Q2: " + q2ChosenOption + "\n" +
        "Q3: " + q3ChosenOption + "\n" +
        "Q4: " + q4ChosenOption + "\n" +
        "Q5: " + q5ChosenOption
      );
      setErrorMessage("");
      props.navigation.navigate("Home");

    } else {
      setErrorMessage("Please answer all the questions.");
      console.log(
        "User didn't answer all the prompts."
      );
    }
  };

  return (
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
          <ScrollView > 
            <Text style={styles.text}>30 Days Challenge</Text>
              <View>
              {/* Question 1 */}
              <View style={styles.radioButtonContainer}>
              <Text style={styles.questionText}>{ questions.at(0) }<Text style={styles.selectOptionText}>Select one option.</Text></Text>
              <RadioForm
                  radio_props={yesNoOptions}
                  initial={-1} //initial value of this group
                  buttonColor={COLORS.tan}
                  labelColor={COLORS.black}
                  selectedButtonColor={"#FBB749"}
                  selectedLabelColor={"#020202"}
                  
                  onPress={(value) => {
                    setq1ChosenOption(value);
                  }}
                />
              </View>

              {/* Question 2 */}
              <View style={styles.radioButtonContainer}>
              <Text style={styles.questionText}>{ questions.at(1) }<Text style={styles.selectOptionText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={customOptions1}
                  initial={-1} //initial value of this group
                  buttonColor={COLORS.tan}
                  labelColor={COLORS.black}
                  selectedButtonColor={"#FBB749"}
                  selectedLabelColor={"#020202"}
                  onPress={(value) => {
                    setq2ChosenOption(value);
                  }} 
                />
              </View>

              {/* Question 3 */}
              <View style={styles.radioButtonContainer}>
              <Text style={styles.questionText}>{ questions.at(2) }<Text style={styles.selectOptionText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={scaleOptions}
                  initial={-1} //initial value of this group
                  buttonColor={COLORS.tan}
                  labelColor={COLORS.black}
                  selectedButtonColor={"#FBB749"}
                  selectedLabelColor={"#020202"}
                  onPress={(value) => {
                    setq3ChosenOption(value);
                  }} 
                />
              </View>

              {/* Question 4 */}
              <View style={styles.radioButtonContainer}>
              <Text style={styles.questionText}>{ questions.at(3) }<Text style={styles.selectOptionText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={scaleOptions}
                  initial={-1} //initial value of this group
                  buttonColor={COLORS.tan}
                  labelColor={COLORS.black}
                  selectedButtonColor={"#FBB749"}
                  selectedLabelColor={"#020202"}
                  onPress={(value) => {
                    setq4ChosenOption(value);
                  }} 
                />
              </View>

              {/* Question 5 */}
              <View style={styles.radioButtonContainer}>
              <Text style={styles.questionText}>{ questions.at(4) }<Text style={styles.selectOptionText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={yesNoOptions}
                  initial={-1} //initial value of this group
                  buttonColor={COLORS.tan}
                  labelColor={COLORS.black}
                  selectedButtonColor={"#FBB749"}
                  selectedLabelColor={"#020202"}
                  onPress={(value) => {
                    setq5ChosenOption(value);
                  }} 
                />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity> 
            <Text style={styles.error}>{errorMessage}</Text>
            {/* <View style={styles.padding}></View> */}
            </ScrollView>
        </SafeAreaView>
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
    fontFamily: "Inter_800ExtraBold",
    color: "#020202",
    fontSize: 30,
    textAlign: "center",
    alignItems: "center",
    width: "100%",
    height: 300,
    position: "absolute",
    lineHeight: 105,
    top: 5,
  },
  button: {
    backgroundColor: COLORS.green,
    width: 327,
    height: 44,
    top: 100,
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
  questionText: {
    color: "#020202",
    fontFamily: "Inter_700Bold",
    fontSize: 17,
    textAlign: "left",
    paddingRight: 10,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  selectOptionText: {
      color: "#0D9968",
      fontFamily: "Inter_400Regular",
      fontSize: 17,
    }, 
    radioButtonContainer: {
    top: 95,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  padding: {
    height: 100
  },
  error: {
    color: "#FF0000",
    fontFamily: "Inter_400Regular",
    alignSelf: "center",
    fontSize: 15,
    textAlign: "center",
    top: Platform.OS === "ios"? 80: 125,
    marginBottom: 100,
    marginTop: 25
  },
});

