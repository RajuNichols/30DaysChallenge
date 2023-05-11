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
import * as backend from "../backendNew/backend";

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
  const [q6ChosenOption, setq6ChosenOption] = useState(null);
  const [q7ChosenOption, setq7ChosenOption] = useState(null);
  const [q8ChosenOption, setq8ChosenOption] = useState(null);
  const [q9ChosenOption, setq9ChosenOption] = useState(null);
  const [q10ChosenOption, setq10ChosenOption] = useState(null);

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
    '1. How many cigarettes do you have per day? ',
    '2. Time to first cigarette of the day: ',
    '3. Having difficulty not smoking in no-smoking areas? ',
    '4. Which cigarette would be the most difficult to give up?  ',
    '5. Smoke more frequently in the first hours after waking:  ',
    '6. Still smoke when ill in bed:  ',
    '7. Have you been diagnosed with depression? ',
    '8. When did you start drinking consistently in excess? ',
    '9. Have you used any other drugs in the past year? ',
    '10. How many nights do you drink per week? '
  ];

  const yesNoOptions = [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' },
  ];

  const tenOrLessOptions = [
    { label: '10 or less', value: '0'},
    { label: '11-20', value: '1'},
    { label: '21-30', value: '2'},
    { label: '31 or more', value: '3'},
  ];

  const sixyOrMoreOptions = [
    { label: '60 min or more', value: '0'},
    { label: '31-60 min', value: '1'},
    { label: '6-30 min', value: '2'},
    { label: '0-5 min', value: '3'},
  ];

  const firstInMornOptions = [
    { label: 'First in the morning', value: '1'},
    { label: 'Others', value: '0'},
  ]

  const youngerThanOptions = [
    { label: 'Younger than 10', value: '4'},
    { label: '10-15', value: '3'},
    { label: '15-18', value: '2'},
    { label: '18-21', value: '1'},
    { label: '21+', value: '0'},
  ]

  const howManyNightsOptions = [
    { label: '2 or less nights', value: '0'},
    { label: '3 nights', value: '1'},
    { label: '4 nights', value: '2'},
    { label: '5+ nights', value: '3'},
  ]


  const handleSubmit = async () => {
    // #TODO
    // This is where we will use the backend to check the login values to see if they are valid, if so we will transition to the dashboard.

    if (q1ChosenOption && q2ChosenOption && q3ChosenOption && q4ChosenOption && q5ChosenOption
      && q6ChosenOption && q7ChosenOption && q8ChosenOption && q9ChosenOption && q10ChosenOption)
    {
      var smokingTotal = parseInt(q1ChosenOption) + 
                          parseInt(q2ChosenOption) + 
                          parseInt(q3ChosenOption) + 
                          parseInt(q4ChosenOption) + 
                          parseInt(q5ChosenOption) + 
                          parseInt(q6ChosenOption)
      var drinkingTotal = parseInt(q7ChosenOption) + 
                          parseInt(q8ChosenOption) + 
                          parseInt(q9ChosenOption) + 
                          parseInt(q10ChosenOption)

      console.log("Smoking total: " + smokingTotal);
      console.log("Drinking total: " + drinkingTotal);

      var temp = await backend.addDifficulty(backend.userNew.username, drinkingTotal, smokingTotal);

      // MATT TODO: Assign difficulties here

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
          <Text style={styles.title}>30 Days Challenge</Text>
          <ScrollView style={styles.scroll}> 
              <View style={styles.content}>
              {/* Question 1 */}
              <View style={styles.radioButtonContainer}>
              <Text style={styles.questionText}>{ questions.at(0) }<Text style={styles.selectOptionText}>Select one option.</Text></Text>
              <RadioForm
                  radio_props={tenOrLessOptions}
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
                  radio_props={sixyOrMoreOptions}
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
                  radio_props={yesNoOptions}
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
                  radio_props={firstInMornOptions}
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

              {/* Question 6 */}
              <View style={styles.radioButtonContainer}>
              <Text style={styles.questionText}>{ questions.at(5) }<Text style={styles.selectOptionText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={yesNoOptions}
                  initial={-1} //initial value of this group
                  buttonColor={COLORS.tan}
                  labelColor={COLORS.black}
                  selectedButtonColor={"#FBB749"}
                  selectedLabelColor={"#020202"}
                  onPress={(value) => {
                    setq6ChosenOption(value);
                  }} 
                />
              </View>

               {/* Question 7 */}
               <View style={styles.radioButtonContainer}>
              <Text style={styles.questionText}>{ questions.at(6) }<Text style={styles.selectOptionText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={yesNoOptions}
                  initial={-1} //initial value of this group
                  buttonColor={COLORS.tan}
                  labelColor={COLORS.black}
                  selectedButtonColor={"#FBB749"}
                  selectedLabelColor={"#020202"}
                  onPress={(value) => {
                    setq7ChosenOption(value);
                  }} 
                />
              </View>

              {/* Question 8 */}
              <View style={styles.radioButtonContainer}>
              <Text style={styles.questionText}>{ questions.at(7) }<Text style={styles.selectOptionText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={youngerThanOptions}
                  initial={-1} //initial value of this group
                  buttonColor={COLORS.tan}
                  labelColor={COLORS.black}
                  selectedButtonColor={"#FBB749"}
                  selectedLabelColor={"#020202"}
                  onPress={(value) => {
                    setq8ChosenOption(value);
                  }} 
                />
              </View>

               {/* Question 9 */}
              <View style={styles.radioButtonContainer}>
              <Text style={styles.questionText}>{ questions.at(8) }<Text style={styles.selectOptionText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={yesNoOptions}
                  initial={-1} //initial value of this group
                  buttonColor={COLORS.tan}
                  labelColor={COLORS.black}
                  selectedButtonColor={"#FBB749"}
                  selectedLabelColor={"#020202"}
                  onPress={(value) => {
                    setq9ChosenOption(value);
                  }} 
                />
              </View>

               {/* Question 10 */}
              <View style={styles.radioButtonContainer}>
              <Text style={styles.questionText}>{ questions.at(9) }<Text style={styles.selectOptionText}>Select one option.</Text></Text>
                <RadioForm
                  radio_props={howManyNightsOptions}
                  initial={-1} //initial value of this group
                  buttonColor={COLORS.tan}
                  labelColor={COLORS.black}
                  selectedButtonColor={"#FBB749"}
                  selectedLabelColor={"#020202"}
                  onPress={(value) => {
                    setq10ChosenOption(value);
                  }} 
                />
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity> 
            <Text style={styles.error}>{errorMessage}</Text>

            <Text style={styles.descHeader}>Citations:</Text>
            <Text style={styles.descText}>Lai CC, Huang WH, Chang BC, Hwang LC. Development of Machine Learning Models for Prediction of Smoking Cessation Outcome. Int J Environ Res Public Health. 2021 Mar 5;18(5):2584. doi: 10.3390/ijerph18052584. PMID: 33807561; PMCID: PMC7967540. </Text>
            <Text style={styles.descText}>Stillman MA, Sutcliff J. Predictors of relapse in alcohol use disorder: identifying individuals most vulnerable to relapse. Addict Subst Abuse 2020. 1(1): 3-8. </Text>
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
  descHeader: {
    fontFamily: "Inter_900Black",
    padding: 15,
    marginBottom: -30,
    fontSize: 20,
  },
  descText: {
    fontSize: 17,
    padding: 15,
    fontFamily: "Inter_400Regular",
  },
  scroll:{
    marginTop: "10%",
  },
  content:{
    top: "-3%",
  },
  title:{
    fontSize: 30,
    fontFamily: "Inter_800ExtraBold",
    textAlign: "center",
    top: "5%",
    color: COLORS.black,
  }
});

