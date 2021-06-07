import { ActionTypes } from "./constants";

const defaultState = {
  stores: [],
  currentPage: 0,
  counter:null,
};

export default function homePageReducer(state = defaultState, action) {
  switch (action.type) {
    case ActionTypes.SET_STORES:
      return { ...state, stores: action.payload };
    
      case ActionTypes.SET_COUNTER:
      return { ...state, counter: action.payload };

    case ActionTypes.INC_CURRENT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };

    case ActionTypes.DEC_CURRENT_PAGE:
      return { ...state, currentPage: state.currentPage - 1 };

    default:
      return state;
  }
}