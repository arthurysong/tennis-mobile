import { ago } from "time-ago";

export const timeAgo = (datetime) => {
  str = ago(datetime);
  str = str.replace("second", "sec");
  str = str.replace("minute", "min");
  str = str.replace("hour", "hr");
  str = str.replace("day", "day");
  str = str.replace("week", "wk");
  str = str.replace("month", "mon");
  str = str.replace("year", "yr");

  return str;
};
