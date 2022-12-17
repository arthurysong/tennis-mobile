import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Button,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { tennisCourtState } from "Recoil";
import { useRecoilState } from "recoil";
import star from "Assets/star.png";
import { useNavigation } from "@react-navigation/native";
import Reports from "./TennisCourtDetails/Reports";

export default function TennisCourtPreview() {
  const [tennisCourt] = useRecoilState(tennisCourtState);
  const navigation = useNavigation();
  if (tennisCourt) {
    const { averageRating, numReviews } = tennisCourt;
    return (
      <Pressable
        style={styles.tennisCourtPreview}
        onPressOut={() =>
          navigation.navigate("TennisCourtDetails", { name: tennisCourt.name })
        }
      >
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>
        <Text style={styles.name}>{tennisCourt.name}</Text>
        <View style={styles.ratingPlusLocation}>
          <Image source={star} style={styles.starIcon} />
          <Text style={styles.rating}>{averageRating.toFixed(1)}</Text>
          <Text style={styles.ratingCount}>({numReviews})</Text>
          <Text style={styles.city}>
            {tennisCourt.city}, {tennisCourt.state}
          </Text>
        </View>
        <Reports forPreview />
      </Pressable>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  tennisCourtPreview: {
    position: "absolute",
    // height: 300,
    bottom: 0,
    backgroundColor: "white",
    width: Dimensions.get("window").width,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    padding: 15,
    paddingTop: 25,
  },
  handleContainer: {
    position: "absolute",
    top: 5,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  handle: {
    height: 5,
    width: 30,
    backgroundColor: "#e8e8e8",
    borderRadius: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  ratingPlusLocation: {
    flexDirection: "row",
    alignItems: "center",
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  rating: {
    marginLeft: 5,
    color: "#E5AA17",
    fontWeight: "bold",
  },
  ratingCount: {
    color: "#84848D",
    marginLeft: 5,
  },
  city: {
    color: "#84848D",
    marginLeft: 20,
    fontWeight: "500",
  },
});
