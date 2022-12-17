import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { loadingSpinnerState } from "Recoil";
import { useRecoilState } from "recoil";

export default function Loading() {
  const [loading] = useRecoilState(loadingSpinnerState);
  return (
    <Modal transparent={true} visible={loading}>
      <View style={styles.background}>
        <View style={styles.main}>
          <ActivityIndicator size="large" color="#ddd" />
          <Text style={{ marginLeft: 8 }}>Loading... </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  loading: {},
  background: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
  },
  main: {
    padding: 14,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
