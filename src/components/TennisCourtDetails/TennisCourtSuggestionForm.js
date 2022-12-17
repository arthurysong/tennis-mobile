import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  TouchableHighlight,
} from "react-native";
import Modal from "react-native-modal";
import { useRecoilState, useResetRecoilState } from "recoil";
import {
  tennisCourtState,
  tennisCourtSuggestionFormState,
  loadingSpinnerState,
} from "Recoil";
import { TextInput, IconButton, Button } from "react-native-paper";
import Features from "./Features/Features";
import { API_URL } from "@env";
import { showToast } from "Helpers/showToast";
import axios from "axios";

export default function TennisCourtSuggestionForm({ forNewCourt }) {
  const [suggestionForm, setSuggestionForm] = useRecoilState(
    tennisCourtSuggestionFormState
  );
  const resetSuggestionForm = useResetRecoilState(
    tennisCourtSuggestionFormState
  );
  const [_loadingSpinner, setLoadingSpinner] =
    useRecoilState(loadingSpinnerState);
  const [tennisCourt] = useRecoilState(tennisCourtState);
  const { formOpen } = suggestionForm;

  const handleSubmit = () => {
    if (forNewCourt) {
      submitSuggestionForNewCourt();
    } else {
      submitSuggestionForExistingCourt();
    }
  };

  const submitSuggestionForNewCourt = async () => {
    const {
      lat,
      long,
      name,
      streetAddress1,
      streetAddress2,
      city,
      state,
      zip,
      numCourts,
      lights,
      timeLightsOff,
      courtType,
    } = suggestionForm;
    const tennisCourtSuggestionData = {
      tennis_court_suggestion: {
        lat,
        long,
        name,
        street_address_1: streetAddress1,
        street_address_2: streetAddress2,
        city,
        state,
        zip,
        num_courts: numCourts,
        lights,
        time_lights_off: timeLightsOff,
        court_type: courtType,
      },
    };
    try {
      setLoadingSpinner(true);
      await axios.post(
        API_URL + "/tennis_court_suggestions/",
        tennisCourtSuggestionData
      );
      resetSuggestionForm();
      setLoadingSpinner(false);
      showToast("New Court Submitted");
    } catch (e) {
      setLoadingSpinner(false);
      console.log(e);
    }
  };

  const submitSuggestionForExistingCourt = async () => {
    const {
      lat,
      long,
      name,
      streetAddress1,
      streetAddress2,
      city,
      state,
      zip,
      numCourts,
      lights,
      timeLightsOff,
      courtType,
    } = suggestionForm;
    const tennisCourtData = {
      tennis_court: {
        tennis_court_suggestions_attributes: [
          {
            lat,
            long,
            name,
            street_address_1: streetAddress1,
            street_address_2: streetAddress2,
            city,
            state,
            zip,
            num_courts: numCourts,
            lights,
            time_lights_off: timeLightsOff,
            court_type: courtType,
          },
        ],
      },
    };

    try {
      setLoadingSpinner(true);
      await axios.patch(
        API_URL + "/tennis_courts/" + tennisCourt.id,
        tennisCourtData
      );
      resetSuggestionForm();
      setLoadingSpinner(false);
      showToast("Suggestion Added");
    } catch (e) {
      setLoadingSpinner(false);
      console.log(e);
    }
  };

  const onChange = (inputName) => (text) =>
    setSuggestionForm({ ...suggestionForm, [inputName]: text });

  // TODO refactor this modal so this one review form uses the same one.
  return (
    <Modal
      style={styles.tennisCourtSuggestion}
      isVisible={formOpen}
      onBackButtonPress={resetSuggestionForm}
      useNativeDriver={true}
      avoidKeyboard
    >
      <KeyboardAvoidingView style={styles.main}>
        <View style={styles.top}>
          <IconButton icon="close" onPress={resetSuggestionForm} />
          <TouchableHighlight
            onPress={handleSubmit}
            style={{ borderRadius: 8 }}
          >
            <Text style={styles.button}>Submit</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.body}>
          <Text style={styles.header}>
            {forNewCourt ? "Create New Court" : "Suggest An Edit"}
          </Text>
          <Text style={styles.courtName}>{suggestionForm["name"]}</Text>
          <TextInput
            label="Name"
            value={suggestionForm["name"]}
            onChangeText={onChange("name")}
            style={styles.input}
            dense
          />
          <TextInput
            label="Street Address"
            value={suggestionForm["streetAddress1"]}
            onChangeText={onChange("streetAddress1")}
            style={styles.input}
            dense
          />
          <TextInput
            label="Street Address 2"
            value={suggestionForm["streetAddress2"]}
            onChangeText={onChange("streetAddress2")}
            style={styles.input}
            dense
          />
          <TextInput
            label="City"
            value={suggestionForm["city"]}
            onChangeText={onChange("city")}
            style={styles.input}
            dense
          />
          <TextInput
            label="State"
            value={suggestionForm["state"]}
            onChangeText={onChange("state")}
            style={styles.input}
            dense
          />
          <TextInput
            label="Zip"
            value={suggestionForm["zip"]}
            onChangeText={onChange("zip")}
            style={styles.input}
            dense
          />
        </View>
        <Features
          tennisCourt={suggestionForm}
          setTennisCourt={setSuggestionForm}
        />
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  tennisCourtSuggestion: {
    margin: 0,
  },
  main: {
    height: Dimensions.get("window").height,
    backgroundColor: "white",
  },
  header: {
    fontWeight: "600",
    fontSize: 24,
  },
  courtName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#777",
  },
  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    paddingRight: 14,
    alignItems: "center",
    // backgroundColor: "grey",
    margin: 0,
  },
  body: {
    padding: 24,
    paddingTop: 6,
    paddingBottom: 12,
  },
  input: {
    marginTop: 12,
    fontSize: 14,
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#2196F3",
    padding: 8,
    paddingVertical: 4,
    color: "white",
  },
});
