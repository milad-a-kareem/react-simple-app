import { ActionTypes } from "./constants";

export const setStores = (stores) => ({
  type: ActionTypes.SET_STORES,
  payload: stores,
});

export const setCounter = (counter) => ({
  type: ActionTypes.SET_COUNTER,
  payload: counter,
});

export const incCurrentPage = (currentPage) => ({
  type: ActionTypes.INC_CURRENT_PAGE,
  payload: currentPage,
});

export const decCurrentPage = (currentPage) => ({
  type: ActionTypes.DEC_CURRENT_PAGE,
  payload: currentPage,
});