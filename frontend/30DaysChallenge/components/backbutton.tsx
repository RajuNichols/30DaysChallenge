import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";

interface BackButtonProps {
  navigation: any;
}

export default function BackButton(props: BackButtonProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={() => props.navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="black" />
      <Text style={styles.text}>Back</Text>
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
container:{
    display: "flex",
    flexDirection: "row",
    top: "15%",
    left: "20%"
},
text:{
    top: 2,
    fontFamily: "Inter_800ExtraBold"
}
})