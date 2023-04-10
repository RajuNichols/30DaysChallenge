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
import ChallengeListItem from "../components/challengeListItem";

SplashScreen.preventAutoHideAsync();
interface ListOfChallengesPageProps {
  navigation: any;
}

export default function ListOfChallengesPage(props: ListOfChallengesPageProps) {
  // const challengeDisplays = [ false, true, true ]
//   const challengeDisplays = [
//     {
//         id: 1,
//         bool: true,
//     },
//     {
//         id: 2,
//         bool: true,
//     },
//     {
//         id: 3,
//         bool: false,
//     },
// ];

  const [searchInput, setSearchInput] = useState("");
  const [filteredChallenges, setFilteredChallenges] = useState("");
  var [challenge1, setChallenge1] = useState(Boolean);
  var [challenge2, setChallenge2] = useState(Boolean);
  var [challenge3, setChallenge3] = useState(Boolean);
  var [challenge4, setChallenge4] = useState(Boolean);
  var [challenge5, setChallenge5] = useState(Boolean);
  // var [challenge6, setChallenge6] = useState(true);
  function handleChange(text: string) {
    setSearchInput(text)
    // handleSearch(text)
    // for (let challenge of challengeNames)
    for (let i = 0; i < challengeNames.length; i++)
    {
      const challengeName = challengeNames[i].toUpperCase()
      const textName = text.toUpperCase()
      if (challengeName.includes(textName)) // add an || category
      {
        // challengeDisplays[i] = false
        console.log("Detected: " + challengeNames[i])
        if (i ==0) {  setChallenge1(false);}
        else if (i == 1) {setChallenge2(false);}
        else if (i ==2) {setChallenge3(false);}
        else if (i == 3) {setChallenge4(false);}
        else if (i ==4) {setChallenge5(false);}
        // else if (i == 5) {setChallenge6(false);}
        // setChallenge1(
        //   challengeDisplays.map((friend) =>
        //   friend.id === i
        //   ? { ...friend, bool: false }
        //   : { ...friend,  }
        //   )       
        // )
      }
      else 
      {
        // challengeDisplays[i] = true
        if (i ==0) {  setChallenge1(true);}
        else if (i == 1) {setChallenge2(true);}
        else if (i ==2) {setChallenge3(true);}
        else if (i == 3) {setChallenge4(true);}
        else if (i ==4) {setChallenge5(true);}
        // else if (i == 5) {setChallenge6(true);}
      }
    }
    
  }
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

  const name = "Melissa"
  const challengeNames = ['Stop Drinking Alcohol', 'Quit Smoking', 'Drink Water', 'Take Vitamins', 'Exercise', 'Eat vegetables']

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView>
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
          <Text style={styles.text}>New Challenges</Text>
          {/* <View style={styles.searchBar}><Text>Search</Text></View> */}
          <TextInput
              style={styles.searchBar}
              placeholder="Search"
              value={searchInput}
              onChangeText={text => handleChange(text) }
            />
            <TextInput></TextInput>
          <ScrollView style={styles.desc}> 
            <ChallengeListItem display={challenge1} name={challengeNames[0]} difficulty={2}></ChallengeListItem>
            <ChallengeListItem display={challenge2} name={challengeNames[1]} difficulty={1}></ChallengeListItem>
            <ChallengeListItem display={challenge3} name={challengeNames[2]} difficulty={2}></ChallengeListItem>
            <ChallengeListItem display={challenge4} name={challengeNames[3]} difficulty={4}></ChallengeListItem>
            <ChallengeListItem display={challenge5} name={challengeNames[4]} difficulty={2}></ChallengeListItem>
            {/* <ChallengeListItem display={challenge6} name={challengeNames[5]} difficulty={3}></ChallengeListItem> */}


            <Text style={styles.smallerText}>Challenges for {name} </Text>
            <ChallengeListItem name={"Challenge #2"} difficulty={4}></ChallengeListItem>
            <ChallengeListItem name={"Challenge #3"} difficulty={2}></ChallengeListItem>
            <ChallengeListItem name={"Challenge #2"} difficulty={4}></ChallengeListItem>
            <ChallengeListItem name={"Challenge #3"} difficulty={2}></ChallengeListItem>
            <ChallengeListItem name={"Challenge #2"} difficulty={4}></ChallengeListItem>
            <ChallengeListItem name={"Challenge #3"} difficulty={2}></ChallengeListItem>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#D7DADA",
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
  smallerText: {
    alignSelf: "center",
    fontFamily: "Inter_800ExtraBold",
    color: "#020202",
    fontSize: 20,
    top: 60,
    paddingBottom: 70,
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
    backgroundColor: "#FBB749",
    width: "20%",
    height: "40%",
    alignSelf: "center",
    borderRadius: 4,
    justifyContent: "center",
    position: "absolute",
    left: "75%",
    top: "35%",
  },
  buttonText: {
    color: "white",
    fontFamily: "Inter_800ExtraBold",
    alignSelf: "center",
    fontSize: 13,
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
    paddingLeft: 5,
  },
  searchBar: {
    marginTop: 80,
    position: "relative",
    height: 30,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
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
    width: "100%",
    height: "70%",
    top: Platform.OS === "ios" ? 215 : 100,
    // backgroundColor: "#E6E6E6",
    borderRadius: 6,
  },
  challengeName: {
    fontFamily: "Inter_800ExtraBold",
    color: "white",
    paddingTop: 10,
    paddingLeft: 5,
    fontSize: 18,
    // top: 60,
  },
});
