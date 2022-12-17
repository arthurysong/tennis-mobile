import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { IconButton } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { useRecoilState, useResetRecoilState } from "recoil";
import { tennisCourtSuggestionFormState } from "Recoil";

export default function NewCourtButton() {
  const [suggestionForm, setSuggestionForm] = useRecoilState(
    tennisCourtSuggestionFormState
  );
  const resetSuggestionForm = useResetRecoilState(
    tennisCourtSuggestionFormState
  );

  return (
    <TouchableHighlight
      style={styles.newCourtButton}
      onPress={() => setSuggestionForm({ ...suggestionForm, formOpen: true })}
    >
      <AntDesign name="plus" size={22} style={styles.button} color="#111" />
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  newCourtButton: {
    position: "absolute",
    top: 62,
    elevation: 4,
    right: 12,
    opacity: 0.75,
    borderRadius: 1.5,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 1.5,
    padding: 8,
  },
});
