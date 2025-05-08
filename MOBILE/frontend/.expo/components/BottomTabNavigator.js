import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Forum from "./Forum";
import Profile from "./Profile";
import LearnScreen from "./LearnScreen";

const Tab = createBottomTabNavigator();

const LearnScreen2 = () => (
  <View style={styles.screen}>
    <LearnScreen />
  </View>
);

const ForumScreen = () => (
  <View style={styles.screen}>
    <Forum />
  </View>
);

const ProfileScreen = () => (
  <View style={styles.screen}>
    <Profile />
  </View>
);

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          switch (route.name) {
            case "Learn":
              iconName = "home-outline"; // Home icon for Learn screen
              break;
            case "Forum":
              iconName = "chatbubble-ellipses-outline"; // Forum icon
              break;
            case "Profile":
              iconName = "person-outline"; // Profile icon
              break;
          }
          return (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Ionicons
                name={iconName}
                size={28}
                color={focused ? "#fff" : "#bbb"}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Learn" component={LearnScreen2} />
      <Tab.Screen name="Forum" component={ForumScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  tabBar: {
    backgroundColor: "white",
    borderTopWidth: 0,
    elevation: 10, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: -2 }, // Shadow for iOS
    shadowOpacity: 0.1, // Shadow for iOS
    shadowRadius: 10, // Shadow for iOS
    height: 70, // Height of the tab bar
    position: "absolute", // Ensure it sticks to the bottom
    bottom: 0, // Stick to the bottom
    left: 0, // Stretch across the screen
    right: 0, // Stretch across the screen
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 15,
    
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 50,
    height: 50,
  },
  activeIcon: {
    backgroundColor: "#3B82F6", // Blue color for active icon
    borderRadius: 25,
    padding: 10,
    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});