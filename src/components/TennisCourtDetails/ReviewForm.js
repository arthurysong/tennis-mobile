import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { reviewFormState, tennisCourtState, loadingSpinnerState } from "Recoil";
import { useRecoilState, useResetRecoilState } from "recoil";
import Close from "Utils/Close";
import Stars from "Utils/Stars";
import axios from "axios";
import { API_URL } from "@env";
import { getUniqueDeviceID } from "Helpers/getUniqueDeviceId";
import { showToast } from "Helpers/showToast";

export default function ReviewForm() {
  const [reviewForm, setReviewForm] = useRecoilState(reviewFormState);
  const [_tennisCourt, setTennisCourt] = useRecoilState(tennisCourtState);
  const resetReviewForm = useResetRecoilState(reviewFormState);
  const [tennisCourt] = useRecoilState(tennisCourtState);
  const [_, setLoadingSpinner] = useRecoilState(loadingSpinnerState);

  const { formOpen, id, comment, rating } = reviewForm;
  const formState = id ? "update" : "create";

  const handleChangeText = (v) =>
    setReviewForm((state) => ({ ...state, comment: v }));

  const handleStarsPress = (starCount) => {
    setReviewForm((state) => ({ ...state, rating: starCount }));
  };

  const submitReview = async () => {
    const tennisCourtData = {
      tennis_court: {
        reviews_attributes: [
          {
            id,
            rating,
            comment,
            device_id: await getUniqueDeviceID(),
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
      showToast(
        formState === "create"
          ? "Thanks for leaving a review!"
          : "Review updated"
      );

      resetReviewForm();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal
      animationType="slide"
      visible={formOpen}
      style={styles.reviewForm}
      onRequestClose={resetReviewForm}
    >
      <View style={styles.main}>
        <View style={styles.top}>
          <Close onPress={resetReviewForm} />
          <TouchableHighlight
            onPress={submitReview}
            style={{ borderRadius: 8 }}
          >
            <Text style={styles.button}>Post</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.body}>
          <Text style={styles.name}>{tennisCourt.name}</Text>
          <Stars onPress={handleStarsPress} value={rating - 1} />
          <TextInput
            style={styles.textInput}
            onChangeText={handleChangeText}
            value={comment}
            placeholder="Leave some comments about your review."
            multiline
            textAlignVertical="top"
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  reviewForm: {},
  body: {
    backgroundColor: "white",
    padding: 8,
    paddingHorizontal: 14,
    flex: 1,
  },
  textInput: { marginTop: 14, flex: 1 },
  name: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },
  main: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: "#F3F2F3",
  },
  top: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: "white",
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#2196F3",
    padding: 8,
    paddingVertical: 4,
    color: "white",
  },
});
