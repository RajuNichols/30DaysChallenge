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
  Platform,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import DifficultyStars from "../components/difficultystars";
import * as Clipboard from "expo-clipboard";
import { COLORS } from "../colors";
import BackButton from "../components/backbutton";
import EditChallengeModal from "../components/editchallengetitle";
import LoadingIndicator from "../components/loadingindicator";
import * as backend from "../backendNew/backend";
import * as type from "../backendNew/types";

interface ChallengeDescriptionPageProps {
  navigation: any;
  route: any;
}

export default function ChallengeDescriptionPage(
  props: ChallengeDescriptionPageProps
) {
  const [linkMessage, setLinkMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [citation, setCitation] = useState("");
  const [code, setCode] = useState("");
  const { itemId } = props?.route?.params;
  const { codeProp } = props?.route?.params;
  const [isLoading, setIsLoading] = useState(true);
  
  var challenge:type.Challenges[] = [];
  async function getData():Promise<type.Challenges[]>{
    return backend.getChallenges();
  }

  async function begin(){
    if(challenge != null){
      challenge = await getData();
      setTitle(challenge[itemId].articleTitle);
      setStars(challenge[itemId].challengeDifficulty);
      setDescription(challenge[itemId].description);
      setCitation(challenge[itemId].articleSource);
      setCode(challenge[itemId].code);
      setIsLoading(false);
    }
  }

  
  useEffect(() => {
    begin()
  }, []);

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
    await Clipboard.setStringAsync(code);
    setLinkMessage("Code Successfully Copied");
  };

  const HandleModal = () => {
    setIsOpen(!isOpen);
  };

  return isLoading ? (<LoadingIndicator/>) : (
    <View
      style={[
        styles.container,
        isOpen
          ? {
              opacity: 0.3,
              shadowColor: "#00000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            }
          : {},
      ]}
      onLayout={onLayoutRootView}
    >
      <View>
        <BackButton navigation={props.navigation} />
      </View>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.stars}>
        <DifficultyStars difficulty={stars}></DifficultyStars>
      </View>
      <ScrollView
        style={[
          styles.desc,
          isOpen
            ? {
                opacity: 0.3,
                shadowColor: "#00000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
              }
            : {},
        ]}
      >
        <Text style={styles.descHeader}>About:</Text>
        <Text style={styles.descText}>{description}</Text>
        <Text style={styles.descHeader}>Citation:</Text>
        <Text style={styles.descText}>{citation}</Text>
      </ScrollView>
      <Text style={[
        styles.inviteText,
        isOpen
          ? {
              opacity: 0.3,
              shadowColor: "#00000",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0,
              shadowRadius: 0,
              elevation: 0,
            }
          : {},
      ]}>
        Use the link below to invite friends
      </Text>
      <View
        style={[
          styles.inviteSection,
          isOpen
            ? {
                opacity: 0.3,
                shadowColor: "#00000",
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
              }
            : {},
        ]}
      >
        <View
          style={[
            styles.inviteLink,
            isOpen
              ? {
                  opacity: 0.3,
                  shadowColor: "#00000",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0,
                  shadowRadius: 0,
                  elevation: 0,
                }
              : {},
          ]}
        >
          <Text style={styles.inviteLinkText}>
            {code}
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.copyLink,
            isOpen
              ? {
                  opacity: 0.3,
                  shadowColor: "#00000",
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0,
                  shadowRadius: 0,
                  elevation: 0,
                }
              : {},
          ]}
          onPress={copyToClipBoard}
        >
          <Image source={require("../assets/Vector.png")} />
        </TouchableOpacity>
      </View>
      <Text style={styles.linkMessage}>{linkMessage}</Text>

      {/* -----------------Modal----------------- */}
      <View style={styles.modal}>
        <EditChallengeModal challenge={challenge[itemId]} isOpen={isOpen} closeModal={HandleModal} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    width: "100%",
    height: "100%",
    display: "flex",
  },
  text: {
    alignSelf: "center",
    fontFamily: "Inter_800ExtraBold",
    color: COLORS.black,
    fontSize: 18,
    top: "10%",
    paddingLeft: 15,
    paddingRight: 15
  },
  stars: {
    alignItems: "center",
    top: "12%",
  },
  desc: {
    alignSelf: "center",
    alignContent: "center",
    position: "absolute",
    width: 327,
    height: 295,
    top: "35%",
    backgroundColor: COLORS.gray,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    top: "50%",
    alignSelf: "center",
    width: 327,
    height: 44,
    backgroundColor: COLORS.green,
    borderRadius: 4,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
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
    color: COLORS.black,
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    top: "60%",
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
    top: "130%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: COLORS.gray,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  inviteLinkText: {
    textAlign: "center",
    fontFamily: "Inter_400Regular",
    color: COLORS.black,
  },
  copyLink: {
    top: "130%",
    width: 40,
    height: 39,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  linkMessage: {
    top: 551,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 10,
    fontWeight: "bold",
    color: COLORS.black,
    fontFamily: "Inter_400Regular",
  },
  modal: {
    alignSelf: "center",
  },
});
