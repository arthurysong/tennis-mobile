import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import BasicInfo from "./BasicInfo";
import Reports from "./Reports";
import Features from "./Features/Features";
import Location from "./Location";
import LeaveAReview from "./LeaveAReview";
import MyPostsHere from "./MyPostsHere";
import Reviews from "./Reviews";
import ReviewForm from "./ReviewForm";
import TennisCourtSuggestionForm from "./TennisCourtSuggestionForm";
import { useRecoilValue } from "recoil";
import { tennisCourtState } from "Recoil";

export default function TennisCourtDetails({ navigation }) {
  const tennisCourt = useRecoilValue(tennisCourtState);

  return (
    <ScrollView style={styles.tennisCourtDetails}>
      <BasicInfo />
      <Reports />
      <Features tennisCourt={tennisCourt} />
      <Location />
      <LeaveAReview />
      <MyPostsHere />
      <Reviews showSummary />
      <ReviewForm />
      <TennisCourtSuggestionForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tennisCourtDetails: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
