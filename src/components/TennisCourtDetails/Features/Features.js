import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
} from "react-native";
import court from "Assets/court.png";
import light from "Assets/lights.png";
import variation from "Assets/variation.png";
import { courtTypes } from "Constants";
import { createGetStyles } from "Helpers/createGetStyles";
import { DateTime } from "luxon";
import { Menu, Provider, TextInput, IconButton } from "react-native-paper";
import Feature from "./Feature";

export default function Features({ tennisCourt, setTennisCourt }) {
  const forSuggestionForm = setTennisCourt;

  const formatTime = (dateString) => {
    const d = DateTime.fromISO(dateString);

    return d.toLocaleString(DateTime.TIME_SIMPLE);
  };

  const subTextForLights = () => {
    if (tennisCourt.lights === false) {
      return "";
    } else if (!tennisCourt.lights) {
      return "?";
    } else {
      return "* " + formatTime(tennisCourt.timeLightsOff);
    }
  };

  return (
    <Provider>
      <View style={styles.features}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 24,
            paddingHorizontal: 44,
          }}
        >
          <Feature
            featureName="numCourts"
            iconImage={court}
            subText={
              !tennisCourt.numCourts ? "?" : "* " + tennisCourt.numCourts
            }
            featureText="Courts"
            forSuggestionForm={forSuggestionForm}
          />
          <Feature
            featureName="lights"
            iconImage={light}
            subText={subTextForLights()}
            featureText="Lights"
            forSuggestionForm={forSuggestionForm}
            grey={tennisCourt.lights === false}
          />
          <Feature
            featureName="courtType"
            iconImage={variation}
            subText={
              !tennisCourt.courtType
                ? "?"
                : "* " + courtTypes[tennisCourt.courtType]
            }
            featureText="Court Type"
            forSuggestionForm={forSuggestionForm}
          />
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  features: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
