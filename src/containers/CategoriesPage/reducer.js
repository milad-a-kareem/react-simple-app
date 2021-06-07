import { ActionTypes } from "./constants";

const defaultState = {
  cats: [],
};

export default function homePageReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.SET_CATEGORIES:
      return { ...state, cats: action.payload };
    default:
      return state;
  }
}