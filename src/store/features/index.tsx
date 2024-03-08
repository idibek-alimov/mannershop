import { combineReducers } from "redux";
import cartReducer from "./cart/cartSlice";
// import counterReducer from "./counter/counterSlice";
// import StageoneSlice from "./productcreate/StageoneSlice";
// import StagetwoSlice from "./productcreate/StagetwoSlice";
import searchSlice from "./search/searchSlice";
import tokenSlice from "./token/tokenSlice";
// import userSlice from "./user/userSlice";
const rootReducer = combineReducers({
  // counter: counterReducer,
  cart: cartReducer,
  // stageone: StageoneSlice,
  // stagetwo: StagetwoSlice,
  search: searchSlice,
  token: tokenSlice,
  // user: userSlice,
});
export default rootReducer;
