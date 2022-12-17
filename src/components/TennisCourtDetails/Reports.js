import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  Pressable,
} from "react-native";
import { useRecoilState } from "recoil";
import { tennisCourtState } from "Recoil";
import _ from "lodash";
import ReportBubble from "Components/utils/ReportBubble";
import { Link } from "@react-navigation/native";
import { createGetStyles } from "Helpers/createGetStyles";
import { AntDesign } from "@expo/vector-icons";
import { timeAgo } from "Helpers/timeAgo";

export default function Reports({ forPreview }) {
  const [tennisCourt] = useRecoilState(tennisCourtState);
  const { reports } = tennisCourt;

  const sortedReports = _.orderBy(reports, "createdAt", "desc"); // this should be in the backend???
  const mostRecent = sortedReports.slice(0, 3);

  while (mostRecent.length < 3) {
    mostRecent.push({});
  }

  const reportsExist = mostRecent[0].hasOwnProperty("id");
  const getStyles = createGetStyles(styles);

  return (
    <View style={getStyles({ reports: true, forPreview })}>
      {reportsExist ? (
        <>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.header}>Players are reporting</Text>

            <Link to={{ screen: "ReportHistory" }}>
              <View
                style={getStyles({ link: true, linkForPreview: forPreview })}
              >
                <Text
                  style={{
                    color: forPreview ? "white" : "#3f99fc",
                    marginRight: 2,
                    fontWeight: "500",
                  }}
                >
                  History
                </Text>
                <View>
                  <AntDesign
                    name="caretright"
                    size={6}
                    color={forPreview ? "white" : "#3f99fc"}
                  />
                </View>
              </View>
            </Link>
          </View>

          <View style={styles.firstThree}>
            {mostRecent.map((r, index) =>
              r.hasOwnProperty("id") ? (
                <View
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  key={index}
                >
                  <ReportBubble report={r} last={index == 2} styleExpired />
                  {/* {!forPreview && ( */}
                  <Text style={styles.timeAgo}>{timeAgo(r.createdAt)}</Text>
                  {/* )} */}
                </View>
              ) : (
                <View style={{ flex: 1 }} key={index} />
              )
            )}
          </View>
        </>
      ) : (
        <Text style={styles.header}>No reports have been made yet</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  timeAgo: {
    textAlign: "center",
    fontSize: 12,
    color: "#84848D",
    marginTop: 2,
    fontWeight: "600",
  },
  reports: {
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    padding: 20,
    borderTopWidth: 0.5,
    borderColor: "#efefef",
  },
  forPreview: {
    width: "auto",
    marginTop: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 0.5,
    borderColor: "#efefef",
    borderRadius: 4,
  },
  link: {
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  linkForPreview: {
    backgroundColor: "#3f99fc",
    color: "white",
  },
  header: {
    fontSize: 14,
    fontWeight: "600",
    color: "#777",
  },
  firstThree: {
    flexDirection: "row",
    marginTop: 8,
  },
});
