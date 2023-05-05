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
const allChallenges = 
  [
    {
      name: "Vitamins",
      title: "Take Vitamins",
      difficulty: 1,
    },
    {
      name: "Vegetables",
      title: "Eat Vegetables",
      difficulty: 3,
    },
    {
      name: "Sleep",
      title: "Get 8 Hours of Sleep",
      difficulty: 3,
    },
    {
      name: "Music",
      title: "Listen to Music",
      difficulty: 1,
    },
    {
      name: "Diet",
      title: "Diet",
      difficulty: 4,
    },
    {
      name: "Water",
      title: "Drink Water",
      difficulty: 3,
    },
    {
      name: "TV",
      title: "Watch TV",
      difficulty: 1,
    },
    {
      name: "Home Workouts",
      title: "Workout",
      difficulty: 4,
    }
  ]

const User = {
  name: "Melissa",
  personalChallenges: [
    {
      name: "Vitamins",
      title: "Take Vitamins",
      difficulty: 1,
    },
    {
      name: "Vegetables",
      title: "Eat Vegetables",
      difficulty: 3,
    },
    {
      name: "Sleep",
      title: "Sleep",
      difficulty: 3,
    },
    {
      name: "Music",
      title: "Listen to Music",
      difficulty: 1,
    },
    {
      name: "Home Workouts",
      title: "Workout",
      difficulty: 4,
    }
  ],
};

  const [searchInput, setSearchInput] = useState("");
  const [filteredChallenges, setFilteredChallenges] = useState(allChallenges);

  function handleChange(text: string) {
    setSearchInput(text);
    const textName = text.toUpperCase();

    const updatedFilteredChallenges = allChallenges.filter((challenge) => {
      const challengeTitle = challenge.title.toUpperCase();
      return textName === "" || challengeTitle.includes(textName);
    });

    setFilteredChallenges(updatedFilteredChallenges);
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

  return (
    <DismissKeyboard>
      <KeyboardAvoidingView>
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
          <Text style={styles.text}>New Challenges</Text>
          <TextInput
              style={styles.searchBar}
              placeholder="Search"
              value={searchInput}
              onChangeText={text => handleChange(text) }
            />
            <ScrollView style={styles.desc}>
              {filteredChallenges.map((challenge, index) => (
                  <View style={styles.challengeContainer} key={index}>
                      <Text style={styles.challengeName}>{challenge.title}</Text>
                      <View style={styles.stars}>
                          <DifficultyStars difficulty={challenge.difficulty} size={1}></DifficultyStars>
                      </View>
                      <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("ChallengeDescriptionStartPage", {
                                itemId: challenge.name
                              })}>
                          <Text style={styles.buttonText}>View</Text>
                      </TouchableOpacity>
                  </View>
              ))}
            <Text style={styles.smallerText}>Challenges for {User.name} </Text>
              {User.personalChallenges.map((challenge, index) => (
              <View style={styles.challengeContainer} key={index}>
                <Text style={styles.challengeName}>{challenge.title}</Text>
                <View style={styles.stars}>
                    <DifficultyStars difficulty={challenge.difficulty} size={1}></DifficultyStars>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate("ChallengeDescriptionStartPage", {
                          itemId: challenge.name
                        })}>
                    <Text style={styles.buttonText}>View</Text>
                </TouchableOpacity>
            </View>
              ))}
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
    top: "10%",
  },
  smallerText: {
    alignSelf: "center",
    fontFamily: "Inter_800ExtraBold",
    color: "#020202",
    fontSize: 20,
    top: 60,
    paddingBottom: 70,
  },
  searchBar: {
    position: "relative",
    height: 30,
    width: "80%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingLeft: 10,
    top: "12%",
  },
  desc: {
    alignSelf: "center",
    alignContent: "center",
    position: "absolute",
    width: "100%",
    height: "70%",
    top: "30%",
    borderRadius: 6,
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
  challengeName: {
    fontFamily: "Inter_800ExtraBold",
    color: "white",
    paddingTop: 10,
    paddingLeft: 5,
    fontSize: 18,
    // top: 60,
  },

  text2: {
    height: 40, backgroundColor: 'white', borderRadius: 5, padding: 10, 
  },
  textvalid: {
    display: 'none'
  },
  textinvalid: {
      display: 'flex'
  },
});
