import React, { useState } from "react";
import Map from "Components/Map";
import TennisCourtDetails from "Components/TennisCourtDetails/TennisCourtDetails";
import ReportHistory from "Components/TennisCourtDetails/ReportHistory";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  Pressable,
  StatusBar,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import { RecoilRoot, useRecoilState } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { tennisCourtState, tennisCourtSuggestionFormState } from "Recoil";
import * as TaskManager from "expo-task-manager";
import { TENNIS_COURT_REPORT_REQUEST } from "Constants";
import { GeofencingEventType } from "expo-location";
import RecoilNexus from "recoil-nexus";
import { getRecoil, setRecoil } from "recoil-nexus";
import { reportModalState } from "./src/recoil";
import * as Notifications from "expo-notifications";
import GlobalLoadingSpinner from "Utils/GlobalLoadingSpinner";
import LoadingScreen from "Utils/LoadingScreen";
import { RootSiblingParent } from "react-native-root-siblings";
import AllReviews from "Components/TennisCourtDetails/AllReviews";
import AllMyReviews from "Components/TennisCourtDetails/AllMyReviews";
import {
  IconButton,
  Menu,
  Provider as PaperProvider,
} from "react-native-paper";
import theme from "./src/paper/theme";
import crashlytics from "@react-native-firebase/crashlytics";
import { getUniqueDeviceID } from "Helpers/getUniqueDeviceId";

const Stack = createNativeStackNavigator();
StatusBar.setBarStyle("dark-content", true);

TaskManager.defineTask(
  TENNIS_COURT_REPORT_REQUEST,
  ({ data: { eventType, region }, error }) => {
    if (error) {
      crashlytics().log(
        "Event error for TENNIS_COURT_REPORT_REQUEST: " + error.message
      );
      // check `error.message` for more details.
      return;
    }
    if (eventType === GeofencingEventType.Enter) {
      const reportModal = getRecoil(reportModalState);
      const tennisCourt = getRecoil(tennisCourtState);
      setRecoil(reportModalState, !reportModal);

      crashlytics().log("Sending notification..");
      Notifications.scheduleNotificationAsync({
        content: {
          title: tennisCourt.name,
          body: "Are there courts open at the moment?",
        },
        trigger: null,
      });

      console.log("You've entered region:", region);
      crashlytics().log("You've entered region: " + region);
    } else if (eventType === GeofencingEventType.Exit) {
      console.log("You've left region:", region);
      crashlytics().log("You've left the region: " + region);
    }
  }
);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const HeaderRight = () => {
  const [visible, setVisible] = React.useState(false);
  const [tennisCourt] = useRecoilState(tennisCourtState);
  const [_tennisCourtSuggestion, setTennisCourtSuggestion] = useRecoilState(
    tennisCourtSuggestionFormState
  );
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const startSuggestionEdit = () => {
    setTennisCourtSuggestion({
      ...tennisCourt,
      formOpen: true,
    });
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <IconButton
          icon={() => <SimpleLineIcons name="options" size={15} />}
          onPress={openMenu}
        />
      }
    >
      <Menu.Item onPress={startSuggestionEdit} title="Suggest An Edit" />
    </Menu>
  );
};

export default function App() {
  React.useEffect(async () => {
    const uniqId = await getUniqueDeviceID();
    await crashlytics().setAttribute("deviceID", uniqId);
    crashlytics().log(`app mounted for device ${uniqId}`);
  }, []);

  return (
    <RecoilRoot>
      <React.Suspense fallback={<LoadingScreen />}>
        <RootSiblingParent>
          <PaperProvider theme={theme}>
            <RecoilNexus />
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Map">
                <Stack.Screen
                  name="Map"
                  component={Map}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="TennisCourtDetails"
                  component={TennisCourtDetails}
                  options={({ route }) => ({
                    headerStyle: {},
                    title: route.params.name,
                    headerRight: HeaderRight,
                  })}
                />
                <Stack.Screen
                  name="ReportHistory"
                  component={ReportHistory}
                  options={{ headerTitle: "Report History" }}
                />
                <Stack.Screen
                  name="AllReviews"
                  component={AllReviews}
                  options={{ headerTitle: "Reviews" }}
                />
                <Stack.Screen
                  name="AllMyReviews"
                  component={AllMyReviews}
                  options={{ headerTitle: "My Reviews" }}
                />
              </Stack.Navigator>
            </NavigationContainer>
            <GlobalLoadingSpinner />
          </PaperProvider>
        </RootSiblingParent>
      </React.Suspense>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  tennisCourtHeader: { fontWeight: "700" },
});
