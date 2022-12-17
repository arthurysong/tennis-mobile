import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
} from "react-native";
import { Menu, Provider, TextInput, IconButton } from "react-native-paper";
import { createGetStyles } from "Helpers/createGetStyles";

import CourtForm from "./CourtForm";
import LightsForm from "./LightsForm";
import CourtTypeForm from "./CourtTypeForm";

export default function Feature({
  featureName,
  iconImage,
  subText,
  featureText,
  forSuggestionForm,
  grey,
}) {
  const [visible, setVisible] = React.useState(false);
  const getStyles = createGetStyles(styles);
  const onDismiss = () => setVisible(false);
  const renderMenu = () => {
    switch (featureName) {
      case "numCourts":
        return <CourtForm isVisible={visible} onDismiss={onDismiss} />;
      case "lights":
        return <LightsForm isVisible={visible} onDismiss={onDismiss} />;
      case "courtType":
        return <CourtTypeForm isVisible={visible} onDismiss={onDismiss} />;
      default:
        return;
    }
  };

  return (
    <Pressable
      style={getStyles({ featureContainer: true, grey })}
      onPress={forSuggestionForm ? () => setVisible(true) : null}
    >
      <Image source={iconImage} style={getStyles({ featureIcon: true })} />
      <Text style={getStyles({ subText: true, [featureName]: true })}>
        {subText}
      </Text>
      <Text style={styles.featureText}>{featureText}</Text>
      {renderMenu()}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  feature: {},
  featureIcon: {
    width: 48,
    height: 48,
  },
  grey: {
    opacity: 0.3,
  },
  featureText: {
    fontSize: 12,
    fontWeight: "500",
  },
  subText: {
    position: "absolute",
    left: 52,
    fontSize: 10,
    fontWeight: "500",
  },
  timeLightsOff: {
    left: 48,
  },
  courtType: {
    left: 58,
  },
  featureContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
