import { createSelector } from "reselect";

const categoriesPageState = (state) => state.categoriesPage;

export const makeSelectCategories = createSelector(
  categoriesPageState,
  (categoriesPage) => categoriesPage.cats
);
