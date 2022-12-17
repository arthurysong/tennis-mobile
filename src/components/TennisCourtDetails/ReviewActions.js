import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Modal,
  Pressable,
  TouchableHighlight,
} from "react-native";
import { createGetStyles } from "Helpers/createGetStyles";
import { useRecoilState } from "recoil";
import { reviewFormState, tennisCourtState, loadingSpinnerState } from "Recoil";
import axios from "axios";
import { API_URL } from "@env";
import { showToast } from "Helpers/showToast";

// ! Not being used
export default function ReviewActions({ open, setOpen, review }) {
  const getStyles = createGetStyles(styles);
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

    setOpen(false);
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

    setOpen(false);
  };

  return (
    <Modal
      transparent={true}
      visible={open}
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <View style={styles.background}>
        <View style={styles.main}>
          <TouchableHighlight onPress={handleUpdate}>
            <Text style={getStyles({ action: true, update: true })}>
              Update
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={handleDelete}>
            <Text style={getStyles({ action: true, delete: true })}>
              Delete
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => setOpen(false)}>
            <Text style={getStyles({ action: true, cancel: true })}>
              Cancel
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  reviewActions: {},
  background: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
  },
  main: {
    width: Dimensions.get("window").width,
  },
  action: {
    backgroundColor: "white",
    padding: 20,
    textAlign: "center",
    borderTopWidth: 0.5,
    borderColor: "#efefef",
    fontSize: 14,
  },
  update: {
    color: "#3f99fc",
    fontWeight: "500",
  },
  delete: {
    color: "red",
    fontWeight: "500",
  },
  cancel: {
    color: "#777",
  },
});
