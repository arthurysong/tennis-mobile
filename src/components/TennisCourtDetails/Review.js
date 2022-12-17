import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
} from "react-native";
import user from "Assets/user.png";
import TimeAgo from "Utils/TimeAgo";
import Stars from "Utils/Stars";
import { SimpleLineIcons } from "@expo/vector-icons";
import { getUniqueDeviceID } from "Helpers/getUniqueDeviceId";
import { Menu, IconButton } from "react-native-paper";
import { useRecoilState } from "recoil";
import { reviewFormState, tennisCourtState, loadingSpinnerState } from "Recoil";

export default function Review({ review }) {
  const [actionsOpen, setActionsOpen] = React.useState(false);
  const { actionable } = review;
  const [_reviewForm, setReviewForm] = useRecoilState(reviewFormState);
  const [tennisCourt, setTennisCourt] = useRecoilState(tennisCourtState);
  const [_loadingSpinner, setLoadingSpinner] =
    useRecoilState(loadingSpinnerState);

  const handleUpdate = () => {
    const { id, rating, comment } = review;
    setReviewForm((state) => ({
      ...state,
      formOpen: true,
      id,
      rating,
      comment,
    }));

    setActionsOpen(false);
  };

  const handleDelete = async () => {
    const tennisCourtData = {
      tennis_court: {
        reviews_attributes: [
          {
            id: review.id,
            _destroy: 1,
          },
        ],
      },
    };

    try {
      setLoadingSpinner(true);
      const resp = await axios.patch(
        API_URL + "/tennis_courts/" + tennisCourt.id,
        tennisCourtData
      );

      setTennisCourt(resp.data.tennisCourt);
      setLoadingSpinner(false);
      showToast("Review deleted");
    } catch (e) {
      setLoadingSpinner(false);
      console.log(e);
    }

    setActionsOpen(false);
  };

  return (
    <View style={styles.review}>
      <View style={styles.reviewTop}>
        <Image source={user} style={styles.userIcon} />
        <View>
          <Text style={styles.username}>Anonymous User</Text>
          <View style={styles.reviewRating}>
            <Stars small value={review.rating - 1} />
            <TimeAgo datetime={review.createdAt} style={styles.timeAgo} />
          </View>
        </View>
      </View>
      <Text style={styles.reviewDescription}>{review.comment}</Text>

      <View style={styles.bottom}>
        {actionable && (
          <Menu
            visible={actionsOpen}
            onDismiss={() => setActionsOpen(false)}
            anchor={
              <IconButton
                icon={() => (
                  <SimpleLineIcons name="options" size={15} color="#aaa" />
                )}
                onPress={() => setActionsOpen(true)}
              />
            }
          >
            <Menu.Item onPress={handleUpdate} title="Update" />
            <Menu.Item onPress={handleDelete} title="Delete" />
          </Menu>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  review: {
    padding: 20,
    borderTopWidth: 0.5,
    borderColor: "#efefef",
  },
  reviewTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewRating: {
    flexDirection: "row",
  },
  reviewDescription: {
    marginTop: 8,
  },
  userIcon: {
    backgroundColor: "#dfdfdf",
    borderRadius: 666,
    marginRight: 8,
    width: 32,
    height: 32,
  },
  username: {
    fontWeight: "600",
  },
  timeAgo: {
    color: "#84848D",
    marginLeft: 4,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 10,
    height: 20,
  },
});
