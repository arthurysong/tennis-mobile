import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { tennisCourtSuggestionFormState } from "Recoil";
import { useRecoilState } from "recoil";
import FormModal from "./FormModal";
import { createGetStyles } from "Helpers/createGetStyles";

export default function CourtTypeForm({ isVisible, onDismiss }) {
  const [suggestionForm, setSuggestionForm] = useRecoilState(
    tennisCourtSuggestionFormState
  );
  const { courtType } = suggestionForm;
  const setCourtType = (courtType) => () =>
    setSuggestionForm({ ...suggestionForm, courtType });
  const getStyles = createGetStyles(styles);

  return (
    <FormModal isVisible={isVisible} onDismiss={onDismiss}>
      <Text style={{ fontWeight: "500", marginBottom: 8 }}>Court Type</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableHighlight onPress={setCourtType("hard")}>
          <Text
            style={getStyles({ button: true, active: courtType == "hard" })}
          >
            Hard
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={setCourtType("clay")}>
          <Text
            style={getStyles({ button: true, active: courtType == "clay" })}
          >
            Clay
          </Text>
        </TouchableHighlight>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableHighlight onPress={setCourtType("grass")}>
          <Text
            style={getStyles({ button: true, active: courtType == "grass" })}
          >
            Grass
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={setCourtType("synthetic")}>
          <Text
            style={getStyles({
              button: true,
              active: courtType == "synthetic",
            })}
          >
            Synthetic
          </Text>
        </TouchableHighlight>
      </View>
    </FormModal>
  );
}

const styles = StyleSheet.create({
  courtForm: {},
  button: {
    textAlign: "center",
    paddingVertical: 14,
    // paddingHorizontal: 22,
    width: 100,
    backgroundColor: "white",
    borderWidth: 0.4,
    borderColor: "#aaa",
  },
  active: {
    backgroundColor: "#eee",
    // backgroundColor: "#000",
    // color: "white",
    fontWeight: "500",
  },
});
