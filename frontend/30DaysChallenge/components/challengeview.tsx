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

  const monthName = format(startDate, "MMM yyyy");

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
            <View key={index}style={styles.friends}>
              <Checkbox
                key={index}
                value={checkedState[index + 1]}
                onValueChange={() => handleCheckbox(index + 1)}
              />
              <Text style={styles.friendsText} key={index + 1}>
                {friend.name}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.calendarSection}>
          <View style={styles.monthWeekdaysContainer}>
            <View style={styles.monthContainer}>
              <Text style={styles.monthText}>{monthName}</Text>
            </View>
            <View style={styles.weekdaysContainer}>
              <View style={styles.weekday}>
                <Text style={styles.weekdaysText}>S</Text>
              </View>
              <View style={styles.weekday}>
                <Text style={styles.weekdaysText}>M</Text>
              </View>
              <View style={styles.weekday}>
                <Text style={styles.weekdaysText}>T</Text>
              </View>
              <View style={styles.weekday}>
                <Text style={styles.weekdaysText}>W</Text>
              </View>
              <View style={styles.weekday}>
                <Text style={styles.weekdaysText}>T</Text>
              </View>
              <View style={styles.weekday}>
                <Text style={styles.weekdaysText}>F</Text>
              </View>
              <View style={styles.weekday}>
                <Text style={styles.weekdaysText}>S</Text>
              </View>
            </View>
          </View>
          <View style={styles.calendarDaysContainer}>
            {datesArray.map((date, index) => (
              <View key={index} style={styles.calendar}>
                <Text key={index} style={styles.calendarDayText}>
                  {format(date, "dd")}
                </Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.blue,
    alignSelf: "center",
    borderRadius: 6,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  calendar: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "gray",
  },
  calendarDayText: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Inter_400Regular",
  },
  calendarDayMarker: {
    fontSize: 10,
  },
  friendsSection: {
    width: "27%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 15,
  },
  friends: {
    paddingLeft: 5,
    height: "12%",
    flexDirection: "row",
    backgroundColor: COLORS.white,
    marginTop: 8,
    alignItems: "center",
    borderRadius: 3,
  },
  friendsText: {
    marginLeft: 6,
  },
  calendarSection: {
    right: 10,
    height: "125%",
    width: "63%",
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
    borderRadius: 3,
  },
  meText: {
    marginLeft: 7,
  },
  ChallengeDay: {
    textAlign: "center",
    display: "flex",
    fontSize: 20,
    color: COLORS.black,
  },
  monthContainer: {
    alignItems: "center",
  },
  weekdaysContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  monthText: { fontFamily: "Inter_400Regular" },
  weekdaysText: { fontFamily: "Inter_400Regular" },
  monthWeekdaysContainer: {
    flexDirection: "column",
  },
  weekday: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  calendarDaysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
});

export default ChallengeView;
