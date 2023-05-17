import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity, View, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import HomeScreen from "../screens/HomeScreen";
// import TodoScreen from "../screens/TodoScreen";
import EventScreen from "../screens/EventScreen";
import MenuScreen from "../screens/MenuScreen";
import LoginScreen from "../screens/AccountLoginScreen";
import CampusMapScreen from "../screens/CampusMapScreen";
import LeaveFeedbackScreen from "../screens/LeaveFeedbackScreen";
import SettingsScreen from "../screens/SettingsScreen";
import GroupSelectionScreen from "../screens/GroupSelectionScreen"
import AboutUsScreen from "../screens/AboutUsScreen";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MenuStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen name="Account Login" component={LoginScreen} />
      <Stack.Screen name="Campus Map" component={CampusMapScreen} />
      <Stack.Screen name="Leave Feedback" component={LeaveFeedbackScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Group Selection" component={GroupSelectionScreen} />
      <Stack.Screen name="About Us" component={AboutUsScreen} />
    </Stack.Navigator>
  );
}

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: 60 + insets.bottom,
        paddingBottom: insets.bottom,
        borderRadius: 20, // Add rounded corners
        overflow: 'hidden', // Clip the rounded corners
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const icon = options.tabBarIcon ? options.tabBarIcon : '';

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <FontAwesome
              name={icon}
              size={20}
              color={isFocused ? '#C41E3A' : '#ccc'} // Use red color for selected icon
            />
            <Text style={{ color: isFocused ? '#000' : '#ccc', marginTop: 5 }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: "home",
        }}
      />
      {/* <Tab.Screen
        name="Todo"
        component={TodoScreen}
        options={{
          tabBarIcon: "edit",
        }}
      /> */}
      <Tab.Screen
        name="Events"
        component={EventScreen}
        options={{
          tabBarIcon: "calendar",
        }}
      />
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={{
          tabBarIcon: "bars",
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
