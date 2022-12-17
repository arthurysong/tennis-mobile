import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
} from "react-native";
import Modal from "react-native-modal";

export default function FormModal({ children, isVisible, onDismiss }) {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onDismiss}
      onBackdropPress={onDismiss}
      backdropOpacity={0}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          padding: 8,
          alignSelf: "center",
          // width: 180,
          borderRadius: 6,
          elevation: 8,
        }}
      >
        {children}
      </View>
    </Modal>
  );
}
