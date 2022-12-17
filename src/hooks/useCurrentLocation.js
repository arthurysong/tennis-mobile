import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

export function useCurrentLocation() {
  const [position, setPosition] = useState({
    latitude: 34.204268,
    longitude: -118.254088,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  const [circleRegion, setCircleRegion] = useState({
    latitude: 34.204268,
    longitude: -118.254088,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setPosition({ latitude: latitude, longitude: longitude });
      setCircleRegion({ latitude: latitude, longitude: longitude });
    })();
  }, []);

  return { position, setPosition, circleRegion, setCircleRegion };
}
