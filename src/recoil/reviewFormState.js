import { atom } from "recoil";

export const reviewFormState = atom({
  key: "reviewFormState",
  default: {
    formOpen: false,
    id: undefined,
    rating: 0,
    comment: "",
  },
});
