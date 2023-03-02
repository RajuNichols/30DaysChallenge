import React, { useCallback, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_900Black,
  Inter_800ExtraBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { COLORS } from "../colors";
import ChallengeView from "../components/challengeview";

export default function UserDashboardPage() {
  let [fontsLoaded, error] = useFonts({
    Inter_900Black,
    Inter_800ExtraBold,
    Inter_400Regular,
  });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = today;
  const endDate = new Date(startDate.getTime() + 30 * 24 * 60 * 60 * 1000);

  const User = {
    name: "Melissa",
    challenges: [
      {
        title: "Smoking",
        start: startDate,
        end: endDate,
        difficulty: 4,
        completedDates: [
          true,
          false,
          true,
          true,
          false,
          true,
          true,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          false,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ],
      },
      {
        title: "Water",
        start: startDate,
        end: endDate,
        difficulty: 2,
        completedDates: [
          true,
          false,
          true,
          true,
          false,
          true,
          true,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          false,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ],
      },
    ],
    friends: [
      {
        name: "Raju",
        completedDates: [
          true,
          false,
          true,
          true,
          false,
          true,
          true,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          false,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ],
      },
      {
        name: "Anusha",
        completedDates: [
          true,
          false,
          true,
          true,
          false,
          true,
          true,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          false,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ],
      },
      {
        name: "Matt",
        completedDates: [
          true,
          false,
          true,
          true,
          false,
          true,
          true,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          false,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ],
      },
      {
        name: "Caleb",
        completedDates: [
          true,
          false,
          true,
          true,
          false,
          true,
          true,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          false,
          false,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
          true,
        ],
      },
    ],
  };

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
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.pageTitle}>30 Days Challenge</Text>
      <Text style={styles.welcomeUser}>Welcome {User.name}</Text>
      <ScrollView style={styles.challenges}>
        {User.challenges.map((challenge, index) => (
          <View style={styles.challengeView} key={index}>
            <View style={styles.challengeTitleContainer}>
              <Text style={styles.challengeTitle}>{challenge.title}</Text>
            </View>

            <View style={styles.calendar}>
              <ChallengeView
                startDate={challenge.start}
                endDate={challenge.end}
                completedDates={challenge.completedDates}
                challengeDay={8}
                friends={User.friends}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: "100%",
    height: "100%",
    display: "flex",
  },
  pageTitle: {
    fontSize: 30,
    fontFamily: "Inter_800ExtraBold",
    textAlign: "center",
    top: "5%",
    color: COLORS.black,
  },
  welcomeUser: {
    fontSize: 20,
    fontFamily: "Inter_400Regular",
    textAlign: "center",
    top: "5%",
    color: COLORS.black,
  },
  challenges: {
    display: "flex",
    alignSelf: "center",
    top: "10%",
  },
  challengeView: {
    width: 321,
    height: 281,
    alignItems: "center",
  },
  challengeTitle: {
    alignSelf: "flex-start",
    alignItems: "center",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 20,
    paddingLeft: 10,
  },
  challengeTitleContainer: {
    width: 321,
    height: 58,
    backgroundColor: COLORS.green,
    borderRadius: 6,
    marginBottom: 8,
    justifyContent: "center",
  },
  calendar: {
    width: 321,
    height: 350,
  },
});
