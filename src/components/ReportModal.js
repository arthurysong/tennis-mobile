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
import { useRecoilState } from "recoil";
import { reportModalState, tennisCourtState } from "Recoil";
import ReportBubble from "./utils/ReportBubble";
import axios from "axios";
import { API_URL } from "@env";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function ReportModal() {
  const [reportModal, setReportModal] = useRecoilState(reportModalState);
  const [tennisCourt, setTennisCourt] = useRecoilState(tennisCourtState);

  const handlePress = (status) => async () => {
    const tennisCourtData = {
      tennis_court: {
        reports_attributes: [{ status }],
      },
    };

    try {
      const resp = await axios.patch(
        API_URL + "/tennis_courts/" + tennisCourt.id,
        tennisCourtData
      );

      setTennisCourt(resp.data.tennisCourt);
      setReportModal(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Modal
        transparent={true}
        visible={reportModal}
        onRequestClose={() => {
          setReportModal(!reportModal);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.headerText}>{tennisCourt?.name}</Text>
              <Ionicons.Button
                name="close"
                backgroundColor="white"
                onPress={() => setReportModal(!reportModal)}
                color="black"
                iconStyle={styles.icon}
                size={24}
                borderRadius={60}
              />
            </View>
            <View style={styles.body}>
              <Text>Are there courts available?</Text>

              <View style={styles.reports}>
                <ReportBubble
                  report={{ status: "many" }}
                  onPress={handlePress("many")}
                />
                <ReportBubble
                  report={{ status: "some" }}
                  onPress={handlePress("some")}
                />
                <ReportBubble
                  report={{ status: "full" }}
                  onPress={handlePress("full")}
                  last
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  pressable: {
    flex: 1,
    height: 48,
  },
  reports: {
    marginTop: 24,
    flexDirection: "row",
    // flex: 1,
    width: "100%",
    // width: 500,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    // padding: 18,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 0.5,
    width: "100%",
    padding: 18,
    paddingVertical: 12,
    paddingRight: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "600",
    fontSize: 18,
  },
  icon: {
    // borderRadius: 100,
    // backgroundColor: "white",
    borderRadius: 100,
    marginRight: 0,
    // position: "absolute",
    // right: 50,
    // top:
  },
  body: {
    padding: 18,
    width: "100%",
  },
});
