import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
  KeyboardAvoidingView,
} from "react-native";
import {
  TextInput,
  IconButton,
  SegmentedButtons,
  Modal,
} from "react-native-paper";
import { tennisCourtSuggestionFormState } from "Recoil";
import { useRecoilState } from "recoil";
import { createGetStyles } from "Helpers/createGetStyles";
import { DateTime } from "luxon";
import FormModal from "./FormModal";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function LightsForm({ isVisible, onDismiss }) {
  const getStyles = createGetStyles(styles);
  const [suggestionForm, setSuggestionForm] = useRecoilState(
    tennisCourtSuggestionFormState
  );
  const { lights, timeLightsOff } = suggestionForm;
  const getTimeString = () => {
    const dt = DateTime.fromISO(timeLightsOff);
    return dt.toLocaleString(DateTime.TIME_SIMPLE);
  };

  const [showTimePicker, setShowTimePicker] = React.useState(false);

  const onChange = (event, date) => {
    setShowTimePicker(false); // needs to happen before set condition else it bugs out

    if (event.type == "set") {
      setSuggestionForm({
        ...suggestionForm,
        timeLightsOff: date.toISOString(),
      });
    }
  };

  const turnLightsOn = () =>
    setSuggestionForm({ ...suggestionForm, lights: true });
  const turnLightsOff = () =>
    setSuggestionForm({ ...suggestionForm, lights: false });

  return (
    <FormModal isVisible={isVisible} onDismiss={onDismiss}>
      <Text style={{ fontWeight: "500", marginBottom: 8 }}>Lights</Text>
      <View style={{ flexDirection: "row" }}>
        <TouchableHighlight onPress={turnLightsOn}>
          <Text style={getStyles({ button: true, active: lights })}>Yes</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={turnLightsOff}>
          <Text style={getStyles({ button: true, active: lights === false })}>
            No
          </Text>
        </TouchableHighlight>
      </View>

      {lights && (
        <TouchableHighlight onPress={() => setShowTimePicker(true)}>
          <Text style={styles.timeButton}>{getTimeString()}</Text>
        </TouchableHighlight>
      )}
      {showTimePicker && (
        <DateTimePicker
          mode="time"
          value={new Date(timeLightsOff)}
          onChange={onChange}
        />
      )}
    </FormModal>
  );
}

const styles = StyleSheet.create({
  lightsform: {},
  button: {
    textAlign: "center",
    paddingVertical: 14,
    // paddingHorizontal: 22,
    width: 80,
    backgroundColor: "white",
    borderWidth: 0.4,
    borderColor: "#aaa",
  },
  active: {
    backgroundColor: "#eee",
    fontWeight: "500",
  },
  timeButton: {
    textAlign: "center",
    backgroundColor: "#eee",
    paddingVertical: 14,
    width: 160,
    // backgroundColor: "white",
    borderWidth: 0.4,
    borderColor: "#aaa",
    // borderRadius: 12,
    // paddingVertical: 6,
    // paddingHorizontal: 14,
    // marginTop: 6,
  },
});
