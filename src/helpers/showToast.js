import Toast from "react-native-root-toast";

export const showToast = (message) => {
  Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    backgroundColor: "#2196F3",
    textColor: "white",
    visible: true,
    opacity: 1,
  });
};
