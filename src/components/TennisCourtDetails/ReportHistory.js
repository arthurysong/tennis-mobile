import axios from "axios";
import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  FlatList,
} from "react-native";
import { API_URL } from "@env";
import { tennisCourtState } from "Recoil";
import { useRecoilState } from "recoil";
import _ from "lodash";
import { getTime } from "Helpers/getTime";
import ReportBubble from "../utils/ReportBubble"; // use Utils/ReportBubble

export default function ReportHistory() {
  const [dates, setDates] = React.useState(undefined);
  const [tennisCourt] = useRecoilState(tennisCourtState);

  React.useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    // TODO do pagination later.
    const resp = await axios.get(
      `${API_URL}/tennis_courts/${tennisCourt.id}/reports`
    );

    const grouped = _.groupBy(
      _.orderBy(resp.data.reports, ["createdAt"], ["desc"]),
      (report) => {
        const d = new Date(report.createdAt);
        return d.toDateString();
      }
    );

    setDates(Object.entries(grouped));
  };

  const renderItem = ({ item }) => {
    const [d, reports] = item;
    const date = new Date(d);

    const renderReport = ({ item }) => {
      const { createdAt, status } = item;
      return (
        <View style={styles.report}>
          <Text style={styles.reportTime}>{getTime(new Date(createdAt))}</Text>
          <View style={styles.reportBubbleContainer}>
            <ReportBubble verbose noTimeAgo report={item} />
          </View>
        </View>
      );
    };

    return (
      <View style={styles.dateGroup}>
        <View
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            paddingTop: 22,
            paddingBottom: 12,
            paddingHorizontal: 18,
          }}
        >
          <Text style={styles.dateInfo}>
            {date.toLocaleString("default", { month: "long" })} {date.getDate()}
          </Text>
          <Text style={styles.dateInfo}>
            {date.toLocaleString("default", { weekday: "long" })}
          </Text>
        </View>

        <FlatList data={reports} renderItem={renderReport} />
      </View>
    );
  };

  return (
    <View style={styles.reportHistory}>
      <FlatList data={dates} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  reportBubbleContainer: {
    width: 140,
  },
  reportTime: {
    fontWeight: "600",
  },
  report: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#efefef",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    alignItems: "center",
  },
  reportHistory: {
    width: Dimensions.get("window").width,
  },
  dateGroup: {
    width: Dimensions.get("window").width,
  },
  dateInfo: {
    color: "#777",
    fontWeight: "500",
  },
});
