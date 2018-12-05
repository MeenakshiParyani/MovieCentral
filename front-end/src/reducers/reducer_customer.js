import { combineReducers } from "redux";

export const data = (
  state = {
    customerInfo: {},
    moviePlayingHistory: [],
    topTenCustomers: [],
    message: ""
  },
  action
) => {
  switch (action.type) {
    case "CUSTOMER_INFO":
      console.log("In customer info" + action.payload);
      state = {
        ...state,
        customerInfo: action.payload
      };
      break;

    case "REGISTER_USER":
      console.log("In Register user" + action.payload);
      state = {
        ...state,
        message: action.payload
      };
      break;

    case "LOGIN_USER":
      console.log("In Login user" + action.payload);
      state = {
        ...state,
        message: action.payload
      };
      break;

    case "MOVIE_PLAYING_HISTORY":
      state = {
        ...state,
        playPerViewList: action.payload
      };
      break;
    case "TOP_TEN_CUSTOMER":
      state = {
        ...state,
        topTenMovies: action.payload
      };
      break;

    default:
      return state;
  }
  return state;
};
export default combineReducers({
  data
});
