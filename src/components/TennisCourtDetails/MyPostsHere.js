import React from "react";
import { View, Image, StyleSheet, Text, Dimensions } from "react-native";
import { useRecoilValue } from "recoil";
import Review from "./Review";
import _ from "lodash";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { tennisCourtReviewsState } from "Recoil";

export default function MyPostsHere() {
  const { myMostRecentReview, myReviews } = useRecoilValue(
    tennisCourtReviewsState
  );

  if (myMostRecentReview) {
    return (
      <View style={styles.myPostsHere}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <Text style={styles.header}>My Reviews Here</Text>
          <Link to={{ screen: "AllMyReviews" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.allReviewsLink}>
                {myReviews.length} Reviews
              </Text>
              <AntDesign
                name="right"
                size={20}
                color="#ddd"
                style={{ marginLeft: 6 }}
              />
            </View>
          </Link>
        </View>

        <Review review={myMostRecentReview} />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  myPostsHere: {
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    marginTop: 12,
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
  },
  allReviewsLink: {
    fontWeight: "600",
    color: "#777",
  },
});
