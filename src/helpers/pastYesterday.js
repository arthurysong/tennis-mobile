import { DateTime } from "luxon";

export const pastYesterday = (dateString) => {
  // given a date, return if the date was yesterday or past yesterday

  const yesterday = DateTime.now().minus({ days: 1 });

  const dt = DateTime.fromISO(dateString);

  return dt < yesterday || dt.hasSame(yesterday, "day");
};
