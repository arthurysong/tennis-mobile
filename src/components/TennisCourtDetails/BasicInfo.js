import React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { tennisCourtState } from "Recoil";
import { useRecoilState } from "recoil";
import star from "Assets/star.png";

export default function BasicInfo() {
  const [tennisCourt] = useRecoilState(tennisCourtState);
  const { averageRating, numReviews } = tennisCourt;
  return (
    <View style={styles.basicInfo}>
      <Text style={styles.name}>{tennisCourt.name}</Text>
      <View style={styles.reviews}>
        <Image source={star} style={styles.starIcon} />
        <Text style={styles.rating}>{averageRating.toFixed(1)}</Text>
        <Text style={styles.ratingCount}>{numReviews} Reviews</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  basicInfo: {
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    padding: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
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
    color: "#777",
    fontWeight: "500",
    marginLeft: 8,
    paddingLeft: 8,
    borderLeftWidth: 1,
    borderColor: "#efefef",
  },
  reviews: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
});
