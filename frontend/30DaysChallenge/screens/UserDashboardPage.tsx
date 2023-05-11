import React, { useCallback, useEffect } from "react";
import { SafeAreaView, View, StyleSheet, Text, ScrollView, Touchable, TouchableOpacity } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Inter_900Black,
  Inter_800ExtraBold,
  Inter_400Regular,
} from "@expo-google-fonts/inter";
import { COLORS } from "../colors";
import ChallengeView from "../components/challengeview";
import LoadingIndicator from "../components/loadingindicator";
import * as backend from "../backendNew/backend";
import { User, frontendDetails, friendsComplete} from "../backendNew/types";
interface UserDashBoardProps {
  navigation: any;
}
export default function UserDashboardPage(props: UserDashBoardProps) {
  let [fontsLoaded, error] = useFonts({
    Inter_900Black,
    Inter_800ExtraBold,
    Inter_400Regular,
  });

  const [isLoading, setIsLoading] = React.useState(true);
  const [user, setUser] = React.useState("");
  const [data, setData] = React.useState<frontendDetails[]>([]);

  /*//this is start of mock information
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const curentDate = today
  const startDate1 = new Date(curentDate.getTime() - 18 * 24 * 60 * 60 * 1000);
  const startDate2 = new Date(curentDate.getTime() - 10 * 24 * 60 * 60 * 1000);
  const startDate3 = new Date(curentDate.getTime() - 27 * 24 * 60 * 60 * 1000);

  const endDate1 = new Date(startDate1.getTime() + 30 * 24 * 60 * 60 * 1000);
  const endDate2 = new Date(startDate2.getTime() + 30 * 24 * 60 * 60 * 1000);
  const endDate3 = new Date(startDate3.getTime() + 30 * 24 * 60 * 60 * 1000);

  const User = {
    name: "Melissa",
    challenges: [
      {
        title: "Sleep",
        start: startDate1,
        end: endDate1,
        difficulty: 4,
        challengeDay: 19,
        code: "U6BZS3",
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
      },
      {
        title: "Listen to Music",
        start: startDate2,
        end: endDate2,
        difficulty: 2,
        challengeDay: 10,
        code: "ZFUPKP",
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
    ],
      },
      {title: "Workout/Diet",
        start: startDate3,
        end: endDate3,
        difficulty: 4,
        challengeDay: 28,
        code: "8AH263",
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
      }
    ],
  };*/

  var usertemp:User = new User("", "", "", 0, 0);
  var temp2:frontendDetails[] = [];
  //var username:string = "Matt";

  //const [data, setData] = React.useState(challenges);

  async function getData():Promise<boolean>{
    //await backend.sendArticles();

    //var x = await backend.getArticles();

    var check1 = await backend.login("Dev", "dev");
    console.log(check1 + " check1");

    usertemp = await backend.sendUser("Dev");

    setUser(usertemp.username);

    //console.log(user.username);

    //var check2 = await backend.addChallenge("exercise", 2, "Description", "exercise more", "source", "");
    //console.log(check2 + " check2");

    //var check3 = await backend.addChallenge("water", 2, "Description", "drink water", "source", "DSpAc");
    //console.log(check3 + " check2");

    var temp = await backend.getChallenges();

    //console.log(temp[0].userChallengeName);

    var i:number
    for(i = 0; i < temp.length; i++){
      var challenges:frontendDetails
      challenges = new frontendDetails();
      // challenges.challenge.userChallengeName = temp[i].userChallengeName 
      // challenges.challenge.challengeDifficulty = temp[i].challengeDifficulty 
      // challenges.challenge.description = temp[i].description
      // challenges.challenge.articleTitle = temp[i].articleTitle
      // challenges.challenge.articleSource = temp[i].articleSource;
      // challenges.challenge.startDate = temp[i].startDate;
      // challenges.challenge.endDate = temp[i].endDate;
      // challenges.challenge.daysCompleted = temp[i].daysCompleted;
      // challenges.challenge.challengeToken = usertemp.username + temp[i].userChallengeName;

      var dateTemp = new Date();
      dateTemp.setHours(0, 0, 0, 0);
      var daysInMilliseconds = dateTemp.getTime() - temp[i].startDate.getTime();

      challenges.currentDay = (daysInMilliseconds / (24 * 60 * 60 * 1000)) + 1;

      challenges.challenge = temp[i];

      //console.log("Past challenge assign");

      var friendTemp = temp[i].friends;
      for(var j = 0; j < friendTemp.length; j++){
        challenges.daysComplete[j] = new friendsComplete();
        challenges.daysComplete[j].name = friendTemp[j];
        challenges.daysComplete[j].completedDates = await backend.getChallengeDates(usertemp.username, challenges.challenge.userChallengeName);
      }

      temp2[i] = challenges;
      //console.log(temp2[i]);

      //console.log("Past challenge friends");
    }

    setData(temp2);

    //console.log(data);

    return true;
  }

  useEffect(() => {
    const fetchData = async () => {
      var temp = await getData();
      if(temp){
        setIsLoading(false);
      }
    };
    fetchData();
  },[]);

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

  const updateCompletedDates = (challengeIndex:any, newCompletedDates:any) => {
    setData(prevData => {
      const newData = [...prevData]; // copy the old data
      newData[challengeIndex].challenge.daysCompleted = newCompletedDates; // update the necessary field
      return newData; // return the new data which will replace the old data
    });
  }

  return isLoading ? (<LoadingIndicator/>) :(
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <Text style={styles.pageTitle}>30 Days Challenge</Text>
      <Text style={styles.welcomeUser}>Welcome {user}</Text>
      <ScrollView style={styles.challenges}>
        {data.map((challenge, index) => (
          <View style={styles.challengeView} key={index}>
            <TouchableOpacity key={index}style={styles.challengeTitleContainer} onPress={() => props.navigation.navigate("ChallengeDescriptionPage", {
              itemId: index, codeProp: challenge.challenge.code
            })}>
              <Text key={index} style={styles.challengeTitle}>{challenge.challenge.userChallengeName}</Text>
            </TouchableOpacity>

            <View style={styles.calendar}>
              <ChallengeView
                startDate={challenge.challenge.startDate}
                endDate={challenge.challenge.endDate}
                completedDates={challenge.challenge.daysCompleted}
                challengeDay={challenge.currentDay}
                friends={challenge.daysComplete}
                challengeTitle={challenge.challenge.userChallengeName}
                updateCompletedDates={(newCompletedDates:any) => updateCompletedDates(index, newCompletedDates)}
                username={user}
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
    flex: 1
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
    marginTop: "12%",
    marginBottom: "5%",
    flex: 1,
    alignSelf: "center",
  },
  challengeView: {
    alignItems: "center",
  },
  challengeTitle: {
    alignSelf: "flex-start",
    alignItems: "center",
    fontFamily: "Inter_800ExtraBold",
    fontSize: 20,
    paddingLeft: 10,
    color: COLORS.white
  },
  challengeTitleContainer: {
    width: 321,
    height: 58,
    backgroundColor: COLORS.green,
    borderRadius: 6,
    marginBottom: 8,
    marginTop: 25,
    justifyContent: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
    
  },
  calendar: {
    width: 321,
    height: 300,
  },
});
