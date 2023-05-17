import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { StatusBar } from 'expo-status-bar';

const schedule = [
  {
    day: "Monday",
    data: {
      subject: "Základy účtovníctva",
      teacher: "Kajanová Jana doc. Ing. PhD.",
      time: "8:50 - 10:20",
      room: "Učebňa/Room - 19",
      type: "In-Person",
    },
  },
  {
    day: "Tuesday",
    data: {
      subject: "Základy účtovníctva",
      teacher: "Kajanová Jana doc. Ing. PhD.",
      time: "8:50 - 10:20",
      room: "Učebňa/Room - 19",
      type: "In-Person",
    },
  },
  { day: "Wednesday", data: "Schedule for Wednesday" },
  { day: "Thursday", data: "Schedule for Thursday" },
  { day: "Friday", data: "Schedule for Friday" },
  { day: "Saturday", data: "Schedule for Saturday" },
  { day: "Sunday", data: "Schedule for Sunday" },
];

const WeekPicker = ({ selectedDay, onSelectDay }) => {
  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <SafeAreaView style={[styles.container, { position: "absolute", top: 20 }]}>
      {schedule.map((item, index) => (
        <TouchableOpacity
          key={item.day}
          style={[
            styles.dayButton,
            selectedDay === item.day && styles.selectedDayButton,
          ]}
          onPress={() => onSelectDay(item.day)}
        >
          <Text
            style={[
              styles.dayButtonText,
              selectedDay === item.day && styles.selectedDayButtonText,
            ]}
          >
            {daysOfWeek[index]}
          </Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

const HomeScreen = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleSelectDay = (day) => {
    setSelectedDay(day);
  };

  if (!selectedDay) {
    return (
      <SafeAreaView style={styles.homeContainer}>
        <WeekPicker selectedDay={selectedDay} onSelectDay={handleSelectDay} />
      </SafeAreaView>
    );
  }

  const selectedScheduleItem = schedule.find(
    (item) => item.day === selectedDay
  ).data;

  return (
    <SafeAreaView style={styles.homeContainer}>
      <WeekPicker selectedDay={selectedDay} onSelectDay={handleSelectDay} />
      <View style={styles.scheduleContainer}>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderText}>{selectedScheduleItem.subject}</Text>
          </View>
          <View style={styles.cardBody}>
            <Text style={styles.cardSubject}>
            </Text>
            <Text style={styles.cardTeacher}>
              {selectedScheduleItem.teacher}
            </Text>
            <Text style={[styles.cardTime, { color: "#C41E3A" }]}>
              {selectedScheduleItem.time}
            </Text>
          </View>
          <View style={styles.cardFooter}>
            <Text style={styles.cardFooterText}>
              Classroom: {selectedScheduleItem.room}
            </Text>
            <View style={styles.cardCounter}>
              <Text style={styles.cardCounterText}>Card #1</Text>
            </View>
          </View>
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  dayButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedDayButton: {
    backgroundColor: "#C41E3A",
  },
  dayButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
  selectedDayButtonText: {
    color: "#fff",
  },
  homeContainer: {
    flex: 1,
  },
  scheduleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardHeaderText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  cardBody: {
    marginTop: 10,
  },
  cardSubject: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardTeacher: {
    fontSize: 14,
    marginTop: 5,
  },
  cardTime: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#C41E3A",
    marginTop: 10,
  },
  cardFooter: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardFooterText: {
    fontSize: 14,
  },
  cardCounter: {
    backgroundColor: "#C41E3A",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cardCounterText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default HomeScreen;
