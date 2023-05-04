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
      title: "Take Vitamins",
      difficulty: 1,
    },
    {
      title: "Eat Vegetables",
      difficulty: 3,
    },
    {
      title: "Sleep",
      difficulty: 3,
    },
    {
      title: "Listen to Music",
      difficulty: 1,
    },
    {
      title: "Diet",
      difficulty: 4,
    },
    {
      title: "Drink Water",
      difficulty: 3,
    },
    {
      title: "Watch TV",
      difficulty: 1,
    },
    {
      title: "Workout",
      difficulty: 4,
    }
  ]

const User = {
  name: "Melissa",
  personalChallenges: [
    {
      title: "Take Vitamins",
      difficulty: 1,
    },
    {
      title: "Eat Vegetables",
      difficulty: 3,
    },
    {
      title: "Sleep",
      difficulty: 3,
    },
    {
      title: "Listen to Music",
      difficulty: 1,
    },
    {
      title: "Workout/Diet",
      difficulty: 4,
    }
  ],
};

  const [searchInput, setSearchInput] = useState("");
  const [filteredChallenges, setFilteredChallenges] = useState(allChallenges);

  function handleChange(text: string) {
    setSearchInput(text)
    const textName = text.toUpperCase();
    var tempArray = filteredChallenges;
    tempArray.splice(0, tempArray.length)
    setFilteredChallenges(tempArray)

    for (let i = 0; i < allChallenges.length; i++) 
    {
        var tempArray = filteredChallenges;
        const challengeTitle = allChallenges[i].title.toUpperCase();
        if (textName === "")
        {
          continue;
        }
        else if (challengeTitle.includes(textName))
        {
          if (tempArray.includes(allChallenges[i]))
          {
            continue;
          }
          tempArray.push(allChallenges[i])
          setFilteredChallenges(() => tempArray)
        } else
        {
          tempArray.splice(i, 1)
          setFilteredChallenges(() => tempArray)
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
                <View key={index}>
                    <ChallengeListItem name={challenge.title} difficulty={1} index={index}></ChallengeListItem>
                 </View>
              ))}
            <Text style={styles.smallerText}>Challenges for {User.name} </Text>
              {User.personalChallenges.map((challenge, index) => (
                <View key={index}>
                    <ChallengeListItem name={challenge.title} difficulty={challenge.difficulty} index={index}></ChallengeListItem>
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
});
