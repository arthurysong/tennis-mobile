import React, { useState } from "react";
import { StyleSheet, View, Dimensions, Image, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
import axios from "axios";
import { API_URL } from "@env";
import { useCurrentLocation } from "Hooks";
import Markers from "Components/Markers";
import TennisCourtPreview from "Components/TennisCourtPreview";
import Constants from "expo-constants";
import { tennisCourtState } from "Recoil";
import { useRecoilState } from "recoil";
import ReportModal from "./ReportModal";
import { RADIUS } from "Constants";
import NewCourtButton from "./NewCourtButton";
import TennisCourtSuggestionForm from "./TennisCourtDetails/TennisCourtSuggestionForm";

// axios.interceptors.request.use((request) => {
//   console.log("Request", request);
//   return request;
// });

// axios.interceptors.response.use((response) => {
//   console.log("Response:", response);
//   return response;
// });

export default function Map() {
  const { position, setPosition, circleRegion, setCircleRegion } =
    useCurrentLocation();

  const [tennisCourts, setTennisCourts] = useState([]); // TODO this should be in recoil
  const [_tennisCourt, setTennisCourt] = useRecoilState(tennisCourtState);

  React.useEffect(() => {
    fetchCourts(position);
  }, [position]);

  const fetchCourts = async ({ latitude, longitude }) => {
    try {
      const resp = await axios.get(API_URL + "/tennis_courts/by_radius", {
        params: { lat: latitude, long: longitude },
      });

      setTennisCourts(resp.data.tennisCourts);
    } catch (e) {
      console.log(e);
    }
  };

  const onRegionChangeComplete = async (region, details) => {
    if (details.isGesture === true) {
      setPosition(region);
      return;
    }
  };

  const onRegionChange = async (region, details) => {
    if (details.isGesture === true) {
      setCircleRegion(region);
      return;
    }
  };

  const onPress = () => {
    setTennisCourt(undefined);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={position}
        onRegionChange={onRegionChange}
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={onPress}
        showsUserLocation
      >
        <Markers
          tennisCourts={tennisCourts}
          setPosition={setPosition}
          setCircleRegion={setCircleRegion}
        />

        <Circle
          center={{
            latitude: circleRegion.latitude,
            longitude: circleRegion.longitude,
          }}
          strokeWidth={2}
          radius={RADIUS}
          strokeColor="#55abfc"
        />
      </MapView>
      <NewCourtButton />
      <TennisCourtSuggestionForm forNewCourt />
      <TennisCourtPreview />
      <ReportModal />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: Constants.statusBarHeight,
  },
  blah: {
    position: "absolute",
    zIndex: 10,
    bottom: 0,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
