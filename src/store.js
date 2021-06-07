import { createStore, combineReducers } from "redux";
import homePage from "./containers/HomePage/reducer";
import categoriesPage from "./containers/CategoriesPage/reducer";
import itemsPage from "./containers/ItemsPage/reducer";

const reducers = combineReducers({ homePage, categoriesPage, itemsPage})
const store = createStore(reducers)
export default store