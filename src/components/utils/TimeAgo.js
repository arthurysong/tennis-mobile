import React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { createGetStyles } from "Helpers/createGetStyles";
import { timeAgo } from "Helpers/timeAgo";

export default function TimeAgo({ datetime, style }) {
  const getStyles = createGetStyles(styles);

  return (
    <Text style={{ ...style, ...getStyles({ timeAgo: true }) }}>
      {timeAgo(datetime)}
    </Text>
  );
}

const styles = StyleSheet.create({
  timeAgo: {},
});
