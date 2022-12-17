import React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { TextInput, IconButton } from "react-native-paper";
import { tennisCourtSuggestionFormState } from "Recoil";
import { useRecoilState } from "recoil";
import FormModal from "./FormModal";

export default function CourtForm({ isVisible, onDismiss }) {
  const [suggestionForm, setSuggestionForm] = useRecoilState(
    tennisCourtSuggestionFormState
  );
  const { numCourts } = suggestionForm;
  const onChange = (value) =>
    setSuggestionForm({ ...suggestionForm, numCourts: value });

  const decrementNumCourts = () => {
    setSuggestionForm({ ...suggestionForm, numCourts: numCourts - 1 });
  };

  const incrementNumCourts = () => {
    setSuggestionForm({ ...suggestionForm, numCourts: numCourts + 1 });
  };

  return (
    <FormModal isVisible={isVisible} onDismiss={onDismiss}>
      <Text style={{ fontWeight: "500", marginBottom: 8 }}>Courts</Text>
      <View style={{ flexDirection: "row" }}>
        <IconButton icon="minus" onPress={decrementNumCourts} />
        <TextInput
          style={{ width: 80, textAlign: "center" }}
          value={String(numCourts)}
          onChangeText={onChange}
          keyboardType="numeric"
          dense
        />
        <IconButton icon="plus" onPress={incrementNumCourts} />
      </View>
    </FormModal>
  );
}

const styles = StyleSheet.create({
  courtForm: {},
});
