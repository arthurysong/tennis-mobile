import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { useRecoilState } from "recoil";
import { tennisCourtState } from "Recoil";
import * as Clipboard from "expo-clipboard";
import produce from "immer";
import { createGetStyles } from "Helpers/createGetStyles";

export default function Location() {
  const [tennisCourt] = useRecoilState(tennisCourtState);
  const [pressState, setPressState] = React.useState([false, false]);
  const getStyles = createGetStyles(styles);

  const setPressed = (idx, pressed) => {
    setPressState((pressState) =>
      produce(pressState, (draft) => {
        draft[idx] = pressed;
      })
    );
  };

  const copyToClipboard = async (text) => {
    await Clipboard.setStringAsync(text);
  };

  const formattedAddress = (tennisCourt) => {
    return `${tennisCourt.streetAddress1} ${
      tennisCourt.streetAddress2 ? tennisCourt.streetAddress2 + " " : ""
    } ${tennisCourt.city}, ${tennisCourt.state} ${tennisCourt.zip}`;
  };

  const addy = formattedAddress(tennisCourt);
  const latLong = `${tennisCourt.lat},${tennisCourt.long}`;

  return (
    <View style={styles.location}>
      <TouchableHighlight
        onPress={() => copyToClipboard(addy)}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
      >
        <View style={styles.row}>
          <Text style={styles.rowHeader}>Address</Text>
          <Text style={styles.rowData}>{addy}</Text>
        </View>
      </TouchableHighlight>
      <TouchableHighlight
        onPress={() => copyToClipboard(latLong)}
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
      >
        <View style={styles.row}>
          <Text style={styles.rowHeader}>Lat/Lng</Text>
          <Text style={styles.rowData}>{latLong}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  location: {
    marginTop: 12,
    width: Dimensions.get("window").width,
  },
  row: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingVertical: 16,
    borderTopColor: "#efefef",
    borderTopWidth: 0.5,
  },
  pressed: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  rowHeader: {
    fontWeight: "550",
  },
  rowData: {
    fontSize: 12,
    color: "#777",
  },
});
