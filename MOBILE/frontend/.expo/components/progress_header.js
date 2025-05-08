import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const ProgressHeader = () => {
  return (
    <View style={styles.progress_container}>
      {/* Points Section */}
      <View style={styles.iconContainer}>
        <Image source={require("../assets/units/Star.png")} style={styles.image} />
        <View style={styles.underline} />
        <Text style={styles.label}>Points</Text>
        <Text style={styles.value}>120</Text>
      </View>

      {/* Streak Section */}
      <View style={styles.iconContainer}>
        <Image source={require("../assets/Fire.png")} style={styles.image} />
        <View style={styles.underline} />
        <Text style={styles.label}>Streak</Text>
        <Text style={styles.value}>1</Text>
      </View>

      {/* Signs Section */}
      <View style={styles.iconContainer}>
        <Image source={require("../assets/hand.png")} style={styles.image} />
        <View style={styles.underline} />
        <Text style={styles.label}>Signs</Text>
        <Text style={styles.value}>5</Text>
      </View>
    </View>
  );
};

export default ProgressHeader;

const styles = StyleSheet.create({
  progress_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 10, // Add padding for better spacing
  },
  iconContainer: {
    alignItems: "center",
    marginHorizontal: 25, // Adjust spacing between icons
  },
  image: {
    width: 50,
    height: 50,
  },
  underline: {
    height: 2,
    width: "100%", // Full width of the container
    backgroundColor: "#ADD8E6", // Light blue color
    marginVertical: 5, // Space between icon and underline
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5, // Space between underline and label
  },
  value: {
    fontSize: 14,
    color: "gray",
  },
});