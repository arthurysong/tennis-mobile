import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";

export default function LoadingScreen() {
  return (
    <View style={styles.loadingScreen}>
      <View style={styles.main}>
        <ActivityIndicator size="large" color="#ddd" />
        <Text style={{ marginLeft: 8 }}>Loading... </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
