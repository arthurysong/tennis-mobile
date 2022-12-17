import React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Close({ onPress }) {
  return (
    <Ionicons.Button
      name="close"
      backgroundColor="white"
      onPress={onPress}
      color="black"
      iconStyle={styles.close}
      size={24}
      borderRadius={999}
    />
  );
}

const styles = StyleSheet.create({
  close: {
    marginRight: 0,
  },
});
