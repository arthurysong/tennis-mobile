import { atom } from "recoil";
import { DateTime } from "luxon";

export const tennisCourtSuggestionFormState = atom({
  key: "tennisCourtSuggestionFormState",
  default: {
    formOpen: false,
    lat: undefined,
    long: undefined,
    name: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    zip: "",
    numCourts: 2,
    lights: undefined,
    timeLightsOff: DateTime.fromObject({ hour: 21 }).toISO(),
    courtType: undefined,
  },
});
