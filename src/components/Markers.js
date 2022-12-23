import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Marker } from "react-native-maps";
import pin from "Assets/pin.png";
import { tennisCourtState, reportModalState } from "Recoil";
import { useRecoilState } from "recoil";
import * as Location from "expo-location";
import { TENNIS_COURT_REPORT_REQUEST } from "Constants";
import * as Notifications from "expo-notifications";
import crashlytics from "@react-native-firebase/crashlytics";

export default function Markers({
  tennisCourts,
  setPosition,
  setCircleRegion,
}) {
  const [tennisCourt, setTennisCourt] = useRecoilState(tennisCourtState);
  const [reportModal, setReportModal] = useRecoilState(reportModalState);
  const startListeningForTennisCourt = async (tc) => {
    let { status } = await Location.requestBackgroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    const region = {
      id: tc.id,
      latitude: tc.lat,
      longitude: tc.long,
      radius: 500,
    };

    console.log("listening for tc...");
    crashlytics().log(`start listening for tennis court`);
    await Location.startGeofencingAsync(TENNIS_COURT_REPORT_REQUEST, [region]);
  };

  const onMarkerPress = (tc) => async (e) => {
    e.stopPropagation();

    setTennisCourt(tc);
    startListeningForTennisCourt(tc);
    // setReportModal(true); // used for debugging...
    showNotification();
  };

  const showNotification = () => {};

  return (
    <>
      {tennisCourts?.map((tc, index) => {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: tc.lat,
              longitude: tc.long,
            }}
            onPress={onMarkerPress(tc)}
            stopPropagation
            // TODO: use custom image.
          ></Marker>
        );
      })}
    </>
  );
}

// const styles = StyleSheet.create({
//   pin: {
//     width: 100,
//     height: 100,
//   },
// });
