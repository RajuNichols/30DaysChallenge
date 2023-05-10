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

  /*const mockChallenges = [
    {
      title: "The Effects of Your Diet on Sleep",
      difficulty: 4,
      desc: "The studies on the role of carbohydrates on sleep have mixed results. This prospective study of a much larger population of postmenopausal women population demonstrated that high-gi diet was associated with increased insomnia incidence over 3 years  and higher intakes of dietary added sugars, starch, and nonwhole/refined grains each were associated with higher incidence of insomnia. Since tryptophan competes with lnaa for transportation into the brain, this change in ratio may lead to increased tryptophan in the brain . Brain serotonin levels could indeed increase after ingestion of carbohydrate. Fatty acids are another major component of human diet including saturated fat and unsaturated fat. The relationship between fatty acids and sleep wellness has also been studied and is reviewed. Consumption of saturated fat is a major risk factor for cardiovascular disease and diabetes as has been suggested by many scientific societies. In addition, omega-3 fats are considered anti-inflammatory  consumption of which can reduce the inflammation in the body that benefit a number of chronic diseases ; thus, omega-3 fats are commonly used as nutritional supplements to prevent cardiovascular problems and stroke. However, despite the well-established role of pgd2 and pge2 in sleep regulation  studies on the consumption of their precursor omega-6 pufa on sleep wellness are rare. Numerous studies on the role of amino acids on sleep wellness and insomnia have been performed in the past decades.Tryptophan is the substrate for serotonin which has been intensively studied on its role on sleep for many decades. Fatty fish is a major source of dietary vitamin d. Multiple studies have studied the role of vitamin d on sleep. Overall, the study concluded that vitamin d deficiency is associated with a higher risk of sleep disorders including poor sleep quality short sleep duration and sleepiness. A cross-sectional study of adults in the uk suggested there is a relationship between fruit/vegetable intake and sleep wellness  and long sleepers have high plasma levels of vitamin c. However, other than that, literature actually does not have much evidence supporting the relationship of vitamin c and sleep wellness. A randomized double-blind  placebo-controlled study of vitamin b6 and b vitamins on the effects on dreaming and sleep showed no significant differences in the b6-treated group compared with the placebo in terms of time awake during the night, sleep quality, or tiredness on waking",
      source:
        "Zhao M, Tuo H, Wang S, Zhao L. The Effects of Dietary Nutrition on Sleep and Sleep Disorders. Mediators Inflamm. 2020 Jun 25;2020:3142874. doi: 10.1155/2020/3142874. PMID: 32684833; PMCID: PMC7334763.",
    },
    {
      title: "Music For Improving Cognitive Function in Alzheimer's Patients",
      difficulty: 2,
      desc: "The present findings have certain practical and clinical implications. This study observed a global deterioration of musical abilities in ad patients. Nevertheless, the performances of musical emotions’ recognition in both ad groups are poorer than those of the control group  but they did not reach statistical significance. Thus, we can suggest that ad currently presents an aphaso-agnoso-apractic-amusia syndrome. Further studies are necessary to improve the limitations observed in this study in order to deep in the musical processing in ad. And future study cohorts should ideally encompass a wider range of ad and other neurodegenerative diseases with longitudinal assessments to determine the sensitivity and specificity of particular musical patterns  associated to histopathological and molecular data. The results of this study also suggest that it is possible to make a fast assessment of the subject’s musical abilities  considering three musical scores: extra-linguistic solfeggio and emotional recognition scores. We consider that the seashore test could be reserved only to deeply complete the musical profile of the subject. Furthermore  our data also suggest that the power of emotional music could enhance the general mental state in a more direct and involuntary neural network and it could enhance more using music related to the personal experience of the subject. Future studies could find more evidences about the benefits of emotion and music powers on mental health in neurodegenerative diseases in particular in accessing emotional memories. (edited)",
      source:
        "Arroyo-Anlló EM, Dauphin S, Fargeau MN, Ingrand P, Gil R. Music and emotion in Alzheimer's disease. Alzheimers Res Ther. 2019 Aug 7;11(1):69. doi: 10.1186/s13195-019-0523-y. PMID: 31391062; PMCID: PMC6686394.",
    },
    {
      title: "At-Home Workouts For Low-Back Pain",
      difficulty: 4,
      desc: "The benefits of home exercise training on lbp patients this study is the first systematic review and meta-analysis of studies investigating the effectiveness of home exercise programs on pain and functional limitation in patients with lbp. Our meta-analysis showed strong evidence that physical exercise training can take place at home to improve lbp even though we found no studies comparing the same training program between home and another setting. If multiple short bouts of moderate-intensity physical exercise produce significant training effects, learning to integrate physical activity into daily life can become a main goal in the treatment of lbp. Similarly, to center-based exercise we found that yoga improved functional limitation as previous studies also showed. Importantly, our results were in favor of standardized exercise compared to individualized exercise  which may be discordant with the literature based on training in centers [2 26]. This may be explained by the fact that easily-performed standardized exercises can promote a better adherence, and could be more in line with home exercise  whereas individualized exercise may be more in line with practice in a center. The absence of such a significant influence on our study may be due to the wide variety of exercise interventions available and the inconsistency of the intensity and duration of exercise.We also demonstrated that the benefits of exercise were less effective in individuals with a higher body mass index in line with the literature. Meta-analyses also inherit the limitations of the individual studies of which they are composed. Some short time-frames (two weeks ) may also have been too short for a therapeutic effect.",
      source:
        "Quentin C, Bagheri R, Ugbolue UC, Coudeyre E, Pélissier C, Descatha A, Menini T, Bouillon-Minois JB, Dutheil F. Effect of Home Exercise Training in Patients with Nonspecific Low-Back Pain: A Systematic Review and Meta-Analysis. Int J Environ Res Public Health. 2021 Aug 10;18(16):8430. doi: 10.3390/ijerph18168430. PMID: 34444189; PMCID: PMC8391468.",
    },
  ];*/
  
  var challenge:type.Challenges[] = [];
  async function getData():Promise<type.Challenges[]>{
    //var check1 = backend.login("Dev", "dev");
    //console.log(check1);

    //var check2 = backend.addChallenge("water", 2, "Description", "drink water", "source");
    //console.log(check2);

    return backend.getChallenges();
  }

  async function begin(){
    if(challenge != null){
      challenge = await getData();
      setTitle(challenge[itemId].userChallengeName);
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
    fontSize: 24,
    top: "10%",
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
    top: "30%",
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
    top: "55%",
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
    top: 541,
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
