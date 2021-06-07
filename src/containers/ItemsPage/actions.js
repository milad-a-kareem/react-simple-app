import { ActionTypes } from "./constants";

export const setItems = (items) => ({
  type: ActionTypes.SET_ITEMS,
  payload: items,
});