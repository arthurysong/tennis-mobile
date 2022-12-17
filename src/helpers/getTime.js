export const getTime = (date) => {
  // get the time in XX:XX PM format (no seconds)
  return date.toLocaleTimeString().replace(/(.*)\D\d+/, "$1");
};
