import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Switch, ScrollView, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState("");
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    retrieveSelectedGroup();
  }, []);

  useEffect(() => {
    saveSelectedGroup();
  }, [selectedGroup]);

  const retrieveSelectedGroup = async () => {
    try {
      const value = await AsyncStorage.getItem("selectedGroup");
      if (value !== null) {
        setSelectedGroup(value);
      }
    } catch (error) {
      console.error("Error retrieving selected group from AsyncStorage:", error);
    }
  };

  const saveSelectedGroup = async () => {
    try {
      await AsyncStorage.setItem("selectedGroup", selectedGroup);
    } catch (error) {
      console.error("Error saving selected group to AsyncStorage:", error);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleFacultyClick = () => {
    Alert.alert("Faculty Selection", "At the moment, only the Faculty of Management is available.");
  };

  const handleGroupClick = () => {
    navigation.navigate("Group Selection");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Faculty</Text>
          <TouchableOpacity onPress={handleFacultyClick} style={styles.item}>
            <Text style={styles.blockedText}>Faculty of Management</Text>
            <FontAwesome name="pencil" size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Group</Text>
          <TouchableOpacity onPress={handleGroupClick} style={styles.item}>
            <Text style={styles.selectGroup}>{selectedGroup ? selectedGroup : "Select Group"}</Text>
            <FontAwesome name="pencil" size={20} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.item}>
            <Text style={styles.notificationText}>About Changes in Spreading</Text>
            <Switch
              style={styles.toggleSwitch}
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
              thumbColor="#C41E3A"
              trackColor={{ true: "#C41E3A", false: "#CCCCCC" }}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.privacyPolicy}>
            <Text>By using this app, you agree to our </Text>
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 34,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  icon: {
    color: "#C41E3A",
  },
  blockedText: {
    fontSize: 16,
  },
  selectGroup: {
    fontSize: 16,
  },
  notificationText: {
    flex: 1,
    fontSize: 16,
  },
  toggleSwitch: {
    marginLeft: 16,
  },
  privacyPolicy: {
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default SettingsScreen;