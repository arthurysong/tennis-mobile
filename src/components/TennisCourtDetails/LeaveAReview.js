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
import { reviewFormState, tennisCourtState } from "Recoil";
import { useRecoilState } from "recoil";
import Stars from "Utils/Stars";

export default function LeaveAReview() {
  const [reviewForm, setReviewForm] = useRecoilState(reviewFormState);
  const [tennisCourt] = useRecoilState(tennisCourtState);

  const onPress = (starCount) => {
    setReviewForm((state) => ({
      ...state,
      tennisCourtId: tennisCourt.id,
      rating: starCount,
      formOpen: true,
    }));
  };

  return (
    <View style={styles.leaveAReview}>
      <Text style={styles.header}>Rate this court!</Text>
      <Stars onPress={onPress} value={reviewForm.rating - 1} />
    </View>
  );
}

const styles = StyleSheet.create({
  leaveAReview: {
    width: Dimensions.get("window").width,
    padding: 16,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    marginTop: 12,
  },
  header: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#777",
  },
});
