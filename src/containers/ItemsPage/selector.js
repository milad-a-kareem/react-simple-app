import { createSelector } from "reselect";

const itemsPageState = (state) => state.itemsPage;

export const makeSelectItems = createSelector(
  itemsPageState,
  (itemsPage) => itemsPage.items
);