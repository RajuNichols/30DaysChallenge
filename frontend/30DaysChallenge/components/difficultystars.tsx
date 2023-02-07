import React from "react";
import {View, Image, StyleSheet }from "react-native";

interface difficultyProps{
    difficulty: number;
}
const DifficultyStars = (props: difficultyProps) => {
  const blankStarsNum = 5 - props.difficulty;

  const solid = [];
  for (let i = 0; i < props.difficulty; i++) {
    solid.push(<Image key={i} source={require("../assets/Star31.png")} />);
  }
  const blank = [];
  for (let i = 0; i < blankStarsNum; i++) {
    blank.push(<Image key={i} source={require("../assets/Star34.png")} />);
  }

  return(
    <View style={styles.container}>
        {solid}
        {blank}
    </View>
  )
};


const styles = StyleSheet.create({
container:{
    flexDirection: "row",
}
})

export default DifficultyStars;