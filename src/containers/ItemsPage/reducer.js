import { ActionTypes } from "./constants";

const defaultState = {
  items: [],
};

export default function itemsPageReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.SET_ITEMS:
      return { ...state, items: action.payload };

    default:
      return state;
  }
}
