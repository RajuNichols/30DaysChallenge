import React from "react";
import {View, Image, StyleSheet, Platform, TouchableOpacity, Text }from "react-native";
import DifficultyStars from "./difficultystars";

interface challengeListItemProps{
    name: string
    difficulty: number
}
const ChallengeListItem = (props: challengeListItemProps) => {
  const challengeName = props.name;
  const difficulty = props.difficulty;


  return(
    <View style={styles.challengeContainer}>
        <Text style={styles.challengeName}>{props.name}</Text>
        <View style={styles.stars}>
            <DifficultyStars difficulty={props.difficulty} size={1}></DifficultyStars>
        </View>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View</Text>
        </TouchableOpacity>
    </View>
  )
};


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
        top: 60,
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
        paddingTop: 7,
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
        width: 327,
        height: 295,
        top: Platform.OS === "ios" ? 250 : 100,
        backgroundColor: "#E6E6E6",
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
})

export default ChallengeListItem;