import { createSelector } from "reselect";

const homePageState = (state) => state.homePage;

export const makeSelectStores = createSelector(
  homePageState,
  (homePage) => homePage.stores
);

export const makeSelectCounter = createSelector(
  homePageState,
  (homePage) => homePage.counter
);

export const makeSelectCurrentPage = createSelector(
  homePageState,
  (homePage) => homePage.currentPage
);
