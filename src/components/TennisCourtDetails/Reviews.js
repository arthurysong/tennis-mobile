import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
} from "react-native";
import Stars from "Utils/Stars";
import { AntDesign } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { tennisCourtState, tennisCourtReviewsState } from "Recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { createGetStyles } from "Helpers/createGetStyles";
import Review from "./Review";
import _ from "lodash";

export default function Reviews({ showSummary, all }) {
  const [tennisCourt] = useRecoilState(tennisCourtState);
  const { reviews: allReviews } = useRecoilValue(tennisCourtReviewsState);

  const firstTwoReviews = allReviews.slice(0, 2);
  const { averageRating, numReviews } = tennisCourt;
  const reviews = all ? allReviews : firstTwoReviews;
  const showLinkToAllReviews = !all && reviews.length > 0;

  const getStyles = createGetStyles(styles);

  return (
    <View style={getStyles({ reviews: true, allReviews: all })}>
      {showSummary && (
        <View style={styles.reviewSummary}>
          <View style={styles.top}>
            <Text style={styles.header}>Reviews</Text>
            {showLinkToAllReviews && (
              <Link to={{ screen: "AllReviews" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.allReviewsLink}>
                    {numReviews} Reviews
                  </Text>
                  <AntDesign
                    name="right"
                    size={20}
                    color="#ddd"
                    style={{ marginLeft: 6 }}
                  />
                </View>
              </Link>
            )}
          </View>

          <View style={styles.rating}>
            <Text>
              <Text style={styles.ratingFirst}>{averageRating.toFixed(1)}</Text>
              <Text style={styles.ratingSecond}>
                /{(reviews.length ? 5 : 0).toFixed(1)}&nbsp;
              </Text>
              <Text style={{ marginLeft: 10 }}>
                <Stars value={averageRating - 1} small />
              </Text>
            </Text>
          </View>
        </View>
      )}
      {reviews.map((r) => (
        <Review review={r} key={r.id} />
      ))}
      {showLinkToAllReviews && (
        <Link to={{ screen: "AllReviews" }}>
          <View style={styles.seeAllReviews}>
            <Text style={styles.seeAllReviewsLink}>See all Reviews</Text>
            <AntDesign
              name="right"
              size={20}
              color="#ddd"
              style={{ marginLeft: 6 }}
            />
          </View>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  reviews: {
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    marginTop: 12,
  },
  allReviews: {
    marginTop: 0,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 18,
    fontWeight: "700",
  },
  allReviewsLink: {
    fontWeight: "600",
    color: "#777",
  },
  rating: { flexDirection: "row", alignItems: "flex-end" },
  ratingFirst: {
    fontSize: 40,
    fontWeight: "800",
  },
  ratingSecond: { fontSize: 20, color: "#777" },
  reviewSummary: {
    padding: 20,
    paddingBottom: 12,
  },
  seeAllReviews: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 0.5,
    borderColor: "#efefef",
    width: 500,
    width: Dimensions.get("window").width,
  },
  seeAllReviewsLink: {
    color: "#3f99fc",
    fontWeight: "600",
  },
});
