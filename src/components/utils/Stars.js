import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
} from "react-native";
import produce from "immer";
import { createGetStyles } from "Helpers/createGetStyles";
import starNoColor from "Assets/star-no-color.png";
import star from "Assets/star.png";

export default function Stars({ onPress, value, small }) {
  const getStyles = createGetStyles(styles);

  const handlePress = (index) => () => {
    onPress(index + 1);
  };

  return (
    <View style={styles.stars}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Pressable onPress={onPress ? handlePress(i) : undefined} key={i}>
          <Image
            source={i <= value ? star : starNoColor}
            style={getStyles({
              starIcon: true,
              colored: i <= value,
              last: i == 4,
              small,
            })}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stars: {
    display: "flex",
    flexDirection: "row",
  },
  starIcon: {
    width: 38,
    height: 38,
    marginRight: 8,
    opacity: 0.6,
  },
  colored: {
    opacity: 1,
  },
  last: { marginRight: 0 },
  small: {
    width: 20,
    height: 20,
    marginRight: 2,
  },
});
