import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { tennisCourtState } from "Recoil";
import { useRecoilState } from "recoil";
import Reviews from "./Reviews";

export default function AllReviews() {
  return (
    <ScrollView style={styles.allReviews}>
      <Reviews all showSummary />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  allReviews: {},
});
