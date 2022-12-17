import { atom, selector } from "recoil";
import { getUniqueDeviceID } from "Helpers/getUniqueDeviceId";
import _ from "lodash";

export const tennisCourtState = atom({
  key: "tennisCourtState",
  default: undefined,
});

// derived selectors

export const tennisCourtReviewsState = selector({
  key: "tennisCourtReviewsState",
  get: async ({ get }) => {
    const tennisCourt = get(tennisCourtState);
    const deviceID = await getUniqueDeviceID();
    let reviews = tennisCourt
      ? _.orderBy(tennisCourt.reviews, "createdAt", "desc")
      : [];
    reviews = reviews.map((r) => ({
      ...r,
      actionable: r.deviceId === deviceID,
    }));

    const myReviews = reviews.filter((r) => r.deviceId == deviceID);
    const myMostRecentReview =
      myReviews.length > 0
        ? _.orderBy(myReviews, "createdAt", "desc")[0]
        : undefined;

    return { reviews, myReviews, myMostRecentReview };
  },
});
