import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { eachDayOfInterval, format } from "date-fns";
import Checkbox from "expo-checkbox";
import { COLORS } from "../colors";

type CalendarProps = {
  startDate: Date;
  endDate: Date;
  completedDates: boolean[];
  challengeDay: number;
  friends: any[];
};

const ChallengeView: React.FC<CalendarProps> = ({
  startDate,
  endDate,
  completedDates,
  challengeDay,
  friends,
}) => {
  const datesArray = eachDayOfInterval({ start: startDate, end: endDate });
  const [checkedState, setCheckedState] = useState(
    new Array(friends.length + 1).fill(false)
  );

  useEffect(() => {
    getCheckedStates();
  }, []);

  const getCheckedStates = () => {
    const checkboxState: boolean[] = checkedState;
    if (completedDates[challengeDay - 1] === true) {
      checkboxState[0] = true;
    }
    friends.forEach((friend) => {
      if (friend.completedDates[challengeDay - 1] === true) {
        checkboxState[friend + 1] = true;
      }
    });

    setCheckedState(checkboxState);
  };

  const handleCheckbox = (index: number) => {
    if (index === 0) {
      const newCheck = [...checkedState];
      console.log(newCheck);
      newCheck[index] = !newCheck[index];
      setCheckedState(newCheck);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.ChallengeDay}>Day {challengeDay}: </Text>
      <View style={styles.container}>
        <View style={styles.friendsSection}>
          <View style={styles.me}>
            <Checkbox
              value={checkedState[0]}
              onValueChange={() => handleCheckbox(0)}
            />
            <Text style={styles.meText}>Me</Text>
          </View>
          {friends.map((friend, index) => (
            <View style={styles.friends}>
              <Checkbox
                key={index}
                value={checkedState[index + 1]}
                onValueChange={() => handleCheckbox(index + 1)}
              />
              <Text style={styles.friendsText}key={index + 1}>{friend.name}</Text>
            </View>
          ))}
        </View>
        <View style={styles.calendarSection}>
          {datesArray.map((date, index) => (
            <View key={format(date, "yyyy-MM-dd")} style={styles.calendar}>
              <Text style={styles.calendarDayText}>{format(date, "dd")}</Text>
              {challengeDay > index && completedDates[index] ? (
                <Text style={styles.calendarDayMarker}>✅</Text>
              ) : challengeDay > index ? (
                <Text style={styles.calendarDayMarker}>❌</Text>
              ) : (
                <Text style={styles.calendarDayMarker}></Text>
              )}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper:{
    width: 321,
    height: 210,
    backgroundColor: COLORS.blue,
    alignSelf: "center",
    borderRadius: 6,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  calendar: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarDayText: {
    fontSize: 16,
  },
  calendarDayMarker:{
    fontSize: 10,
  },
  friendsSection: {
    width: 85,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 15,
  },
  friends: {
    paddingLeft: 5,
    height: 30,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    marginTop: 8,
    alignItems: "center",
    borderRadius: 3
  },
  friendsText:{
    marginLeft: 7,
  },
  calendarSection: {
    marginTop: 10,
    padding: 10,
    right: 10,
    width: 200,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: COLORS.white,
    borderRadius: 6,
  },
  me: {
    paddingLeft: 5,
    height: 30,
    flexDirection: "row",
    backgroundColor: COLORS.white,
    alignItems: "center",
    borderRadius: 3
  },
  meText:{
    marginLeft: 7,
  },
  ChallengeDay: {
    textAlign: "center",
    display: "flex",
    fontSize: 16,
    color: COLORS.black
    
  },
});

export default ChallengeView;
