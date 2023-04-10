import React from "react";
import {View, Image, StyleSheet }from "react-native";

interface difficultyProps{
    difficulty: number;
    size?: number; // set it to 1 for new challenges page
}
const DifficultyStars = (props: difficultyProps) => {
  const blankStarsNum = 5 - props.difficulty;
  const size = props.size;

  const solid = [];
  for (let i = 0; i < props.difficulty; i++) {
    if (props.size == 1)
    {
      solid.push(<Image style={styles.star} key={i} source={require("../assets/Star31-small.png")} />);
    }
    else 
    {
      solid.push(<Image style={styles.star} key={i} source={require("../assets/Star31.png")} />);
    }
  }
  const blank = [];
  for (let i = 0; i < blankStarsNum; i++) {
    if (props.size == 1) 
    {
      blank.push(<Image style={styles.star} key={i} source={require("../assets/Star34-small.png")} />);
    }
    else
    {
      blank.push(<Image style={styles.star} key={i} source={require("../assets/Star34.png")} />);
    }
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
},
star: {
  // margin: 2,
  // width: "50%",
  // height: "90%"
}
})

export default DifficultyStars;