import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { COLORS } from "../colors";
import { Ionicons } from "@expo/vector-icons";
import * as backend from "../backendNew/backend";

interface EditChallengeModalProps {
  closeModal: () => void;
  isOpen: boolean;
  challenge: any;
  navigation?: any;
  isAlcOrSmoking?: boolean;
}

export default function EditChallengeModal(props: EditChallengeModalProps) {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const handleCreateChallenge = async() => {
    console.log("Create Challenge");
    // This is where we will call the backend endpoint to create a challenge and navigate to the userdashboard.
    const check = await backend.addChallenge(props.challenge.userChallengeName, props.challenge.challengeDifficulty, props.challenge.description, title, props.challenge.articleSource, "");
    console.log(check);
    console.log(title);
    //here is where it uses the challenge info
    console.log(props.challenge);

    if (!title)
    {
      setErrorMessage("Enter a title.")
      console.log("User didn't enter a title.")
      return;
    } 
    if (!props.isAlcOrSmoking)
    {
      if (!difficulty || !Number.isInteger(parseInt(difficulty)) || parseInt(difficulty) < 1 || parseInt(difficulty) > 5)
      {
        setErrorMessage("Enter a difficulty 1-5.")
        console.log("User didn't enter a valid difficulty")
      }
      else 
      {
        setErrorMessage("");
        props.navigation.navigate("Dashboard");
      }
    }
    else 
    {
      setErrorMessage("");
      props.navigation.navigate("Dashboard");
    }
  };

  const difficultyDisplay: any = 
  {
    height: 44,
    width: 250,
    fontFamily: "Inter_400Regular",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
    borderRadius: 4,
    borderColor: COLORS.blue,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    display: props.isAlcOrSmoking ? 'none' : 'flex'
  }

  return (
    <Modal
      style={styles.Container}
      visible={props.isOpen}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.content}>
          <TouchableOpacity style={styles.close} onPress={props.closeModal}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Enter Title For Challenge</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Title name"
              value={title}
              onChangeText={(val: any) => setTitle(val)}
              selectionColor={COLORS.black}
            ></TextInput>
            <TextInput
              style={difficultyDisplay}
              placeholder="Difficulty: 1-5"
              value={difficulty}
              onChangeText={(val: any) => setDifficulty(val)}
              selectionColor={COLORS.black}
            ></TextInput>
          </View>
          <Text style={styles.error}>{errorMessage}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handleCreateChallenge}
          >
            <Text style={styles.buttonText}>Create Challenge</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  Container: {
    margin: 0,
    width: "100%",
    height: "100%",
  },
  content: {
    alignItems: "center",
    position: "absolute",
    left: "10%",
    top: "25%",
    width: "80%",
    height: 300,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    marginTop: "10%",
    fontSize: 20,
    fontFamily: "Inter_800ExtraBold",
  },
  input: {
    height: 44,
    width: 250,
    fontFamily: "Inter_400Regular",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center",
    borderRadius: 4,
    borderColor: COLORS.blue,
    backgroundColor: COLORS.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  close: {
    left: "45%",
  },
  button: {
    marginTop: "15%",
    backgroundColor: COLORS.green,
    width: 250,
    height: 44,
    alignSelf: "center",
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
    fontFamily: "Inter_400Regular",
    color: COLORS.white
  },
  error:{
    color:COLORS.red,
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    textAlign: "center",
    top: -3
  },
  inputDiff: {
    // height: 44,
    // width: 250,
    // fontFamily: "Inter_400Regular",
    // margin: 12,
    // borderWidth: 1,
    // padding: 10,
    // alignSelf: "center",
    // borderRadius: 4,
    // borderColor: COLORS.blue,
    // backgroundColor: COLORS.white,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5,
    // display: isAlcOrSmoking ? 'none' : 'flex'}
  }
});
