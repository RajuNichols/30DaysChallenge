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
import { useFocusEffect } from '@react-navigation/native';
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

  var usertemp:User = new User("", "", "", 0, 0);
  var temp2:frontendDetails[] = [];

  async function getData():Promise<boolean>{
    setIsLoading(true);

    //var check1 = await backend.login("Dev", "dev");
    //console.log(check1 + " check1");

    usertemp = await backend.sendUser(backend.userNew.username);

    setUser(usertemp.username);

    var temp = await backend.getChallenges();

    //console.log(temp[0].userChallengeName);

    var i:number
    for(i = 0; i < temp.length; i++){
      var challenges:frontendDetails
      challenges = new frontendDetails();

      var dateTemp = new Date();
      dateTemp.setHours(0, 0, 0, 0);
      var daysInMilliseconds = dateTemp.getTime() - temp[i].startDate.getTime();

      challenges.currentDay = (daysInMilliseconds / (24 * 60 * 60 * 1000)) + 1;

      challenges.challenge = temp[i];

      //console.log("Past challenge assign");

      var friendTemp = temp[i].friends;
      //console.log(friendTemp);
      for(var j = 0; j < friendTemp.length; j++){
        challenges.daysComplete[j] = new friendsComplete();
        if(friendTemp[j] != ""){
          challenges.daysComplete[j].name = friendTemp[j];
        }else{
          challenges.daysComplete[j].name = "none";
        }
        challenges.daysComplete[j].completedDates = await backend.getChallengeDates(usertemp.username, challenges.challenge.userChallengeName);
        //console.log(challenges.daysComplete[j].completedDates +  "," + j);
      }
      

      temp2[i] = challenges;
      //console.log(temp2[i]);

      //console.log("Past challenge friends");
    }

    setData(temp2);

    //console.log(data);

    return true;
  }

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        var temp = await getData();
        if(temp){
          setIsLoading(false);
        }
      };
      
      fetchData();
      //console.log(data.toString());
  
      return () => {
        // This is the cleanup function that runs when the screen is unfocused
        // You can leave it empty if there's nothing to clean up
      };
    }, [])
  );

  const updateCompletedDates = (challengeIndex:any, newCompletedDates:any) => {
    setData(prevData => {
      const newData = [...prevData]; // copy the old data
      newData[challengeIndex].challenge.daysCompleted = newCompletedDates; // update the necessary field
      return newData; // return the new data which will replace the old data
    });
  }

  return isLoading ? (<LoadingIndicator/>) :(
    <SafeAreaView style={styles.container}>
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
