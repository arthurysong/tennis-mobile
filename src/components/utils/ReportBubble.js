import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { pastYesterday } from "Helpers/pastYesterday";
import { createGetStyles } from "Helpers/createGetStyles";

const shortStatus = { full: "Full", many: "Many", some: "Some" }; // short status
const verboseStatus = {
  full: "Courts are full",
  many: "Many courts",
  some: "Some courts",
};

export default function ReportBubble({
  report,
  last,
  verbose,
  styleExpired,
  onPress,
}) {
  const expired = pastYesterday(report.createdAt);
  const getStyles = createGetStyles(styles);

  const statusText = (status) => {
    return verbose ? verboseStatus[status] : shortStatus[status];
  };

  return (
    <TouchableHighlight
      onPress={onPress}
      style={getStyles({ reportBubble: true, last })}
      activeOpacity={0.95}
      underlayColor="black"
    >
      <View
        style={getStyles({
          bubble: true,
          [report.status]: true,
          expired: styleExpired && expired,
          verbose,
        })}
      >
        <Text style={styles.status}>{statusText(report.status)}</Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  reportBubble: {
    flex: 1,
    borderRadius: 5,
    marginRight: 7,
  },
  bubble: {
    height: 48,
    textTransform: "uppercase",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  verbose: {
    height: 32,
    borderRadius: 3,
    marginRight: 0,
  },
  full: {
    backgroundColor: "red", // TODO pick better color
  },
  many: {
    backgroundColor: "green", // TODO pick better color
  },
  some: {
    backgroundColor: "orange", // TODO pick better color
  },
  expired: {
    backgroundColor: "#999",
  },
  last: {
    marginRight: 0,
  },
  status: {
    textTransform: "uppercase",
    color: "white",
    fontWeight: "500",
    fontSize: 12,
  },
});
