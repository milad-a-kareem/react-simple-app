import { ActionTypes } from "./constants";

export const setCategories = (cats) => ({
  type: ActionTypes.SET_CATEGORIES,
  payload: cats,
});