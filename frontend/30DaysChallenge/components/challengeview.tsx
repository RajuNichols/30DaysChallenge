import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { eachDayOfInterval, format } from "date-fns";
import Checkbox from "expo-checkbox";
import { COLORS } from "../colors";
import LoadingIndicator from "./loadingindicator";

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
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    getCheckedStates();
    setTimeout(() => {
      setLoading(false);
    },2000)
  }, []);

  const getCheckedStates = () => {
    const checkboxState: boolean[] = checkedState;
    if (completedDates[challengeDay - 1] == true) {
      checkboxState[0] = true;
    }
    friends.forEach((friend) => {
      if (friend.completedDates[challengeDay - 1] == true) {
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
      <Text style={styles.ChallengeDay}>Day {challengeDay} </Text><View style={styles.container}>
        <View style={styles.friendsSection}>
          <View style={styles.friends} testID="me-item">
            <Checkbox
              value={checkedState[0]}
              onValueChange={() => handleCheckbox(0)} />
            <Text style={styles.friendsText}>Me</Text>
          </View>
          {friends.map((friend, index) => (
            <View key={index} style={styles.friends} testID={`friend-item-${index}`}>
              <Checkbox
                key={index}
                value={checkedState[index + 1]}
                onValueChange={() => handleCheckbox(index + 1)} />
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
              <View key={index} style={styles.calendar} testID="calendar-day">
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
  )
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.white,
    alignSelf: "center",
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3,
    borderColor: COLORS.blue,
    borderWidth: 5,
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
    top: -2
  },
  friendsSection: {
    top: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: 15,
    height: "70%"
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
    fontFamily: "Inter_400Regular",
  },
  calendarSection: {
    right: 15,
    height: "100%",
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
    alignItems: "center",
    borderRadius: 3,
  },
  meText: {
    marginLeft: 6,
    fontFamily: "Inter_400Regular",
  },
  ChallengeDay: {
    marginTop: "3%",
    paddingLeft: "7%",
    textAlign: "left",
    display: "flex",
    fontSize: 20,
    color: COLORS.black,
    fontFamilyt: "Inter_400Regular",
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
