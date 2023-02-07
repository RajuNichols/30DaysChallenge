import {
  Inter_400Regular,
  Inter_800ExtraBold,
  Inter_900Black,
  useFonts,
} from "@expo-google-fonts/inter";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import DifficultyStars from "../components/difficultystars";
import * as Clipboard from "expo-clipboard";

export default function ChallengeDescriptionPage() {
  const [linkMessage, setLinkMessage] = useState("");
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
  const copyToClipBoard = async () => {
    await Clipboard.setStringAsync("https://linkToCopy.com/Melissa");
    setLinkMessage("Link Successfully Copied");
  };

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.text}> Challenge Name</Text>
      <View style={styles.stars}>
        <DifficultyStars difficulty={3}></DifficultyStars>
      </View>
      <ScrollView style={styles.desc}>
        <Text style={styles.descHeader}>About:</Text>
        <Text style={styles.descText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
          blandit elit ac ipsum eleifend gravida. Fusce venenatis facilisis est
          ullamcorper tristique. Aenean viverra vitae est et blandit. Phasellus
          enim ex, dignissim in venenatis ac, egestas et est. In vitae dolor
          sem. Duis hendrerit ultrices aliquet. Integer vel ante sed ligula
          pellentesque iaculis et et justo. Duis sed ligula non nisl aliquam
          facilisis. Donec elementum felis a est faucibus, non viverra orci
          eleifend. Nulla facilisi. Suspendisse potenti. Cras urna felis,
          posuere ut lacus sed, lobortis lacinia diam. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. Aenean vitae venenatis diam.
          Suspendisse potenti.
        </Text>
      </ScrollView>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
      <Text style={styles.inviteText}>
        Use the link below to invite friends
      </Text>
      <View style={styles.inviteSection}>
        <View style={styles.inviteLink}>
          <Text style={styles.inviteLinkText}>
            https://linkToCopy.com/Melissa
          </Text>
        </View>
        <TouchableOpacity style={styles.copyLink} onPress={copyToClipBoard}>
          <Image source={require("../assets/Vector.png")} />
        </TouchableOpacity>
      </View>
      <Text style={styles.linkMessage}>{linkMessage}</Text>
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
    alignSelf: "center",
    fontFamily: "Inter_800ExtraBold",
    color: "white",
    fontSize: 30,
    top: 80,
  },
  stars: {
    alignItems: "center",
    top: 90,
  },
  desc: {
    alignSelf: "center",
    alignContent: "center",
    position: "absolute",
    width: 327,
    height: 295,
    top: 200,
    backgroundColor: "#E6E6E6",
    borderRadius: 6,
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
    marginBottom: 30,
    fontFamily: "Inter_400Regular",
  },
  button: {
    top: 475,
    alignSelf: "center",
    width: 327,
    height: 44,
    backgroundColor: "#F45D9A",
    borderRadius: 4,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    alignSelf: "center",
    color: "white",
    fontFamily: "Inter_400Regular",
    fontSize: 17,
  },
  inviteText: {
    textAlign: "center",
    alignSelf: "center",
    color: "white",
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    top: 530,
    fontWeight: "bold",
  },
  inviteSection: {
    flexDirection: "row",
    justifyContent: "center",
  },
  inviteLink: {
    width: 281,
    height: 36,
    borderRadius: 10,
    top: 540,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },
  inviteLinkText: {
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  copyLink: {
    top: 541,
    backgroundColor: "#F45D9A",
    width: 40,
    height: 39,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  linkMessage:{
    top: 551,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    fontFamily: "Inter_400Regular",
  }
});
