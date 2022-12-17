import React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import Review from "./Review";
import _ from "lodash";
import { tennisCourtReviewsState } from "Recoil";
import { useRecoilValue } from "recoil";

export default function AllMyReviews() {
  const { myReviews } = useRecoilValue(tennisCourtReviewsState);

  return (
    <View style={styles.AllMyReviews}>
      {myReviews.map((r) => (
        <Review review={r} key={r.id} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  AllMyReviews: {
    backgroundColor: "white",
  },
});
