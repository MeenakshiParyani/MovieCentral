import { combineReducers } from "redux";

export const data = (
  state = {
    movieInfo: {},
    message: "",
    playPerViewList: [],
    topTenMovies: []
  },
  action
) => {
  switch (action.type) {
    case "MOVIE_ADD":
      console.log("In movie add" + action.payload.message);
      state = {
        ...state,
        message: action.payload.message
      };
      break;
    case "MOVIE_PLAY_PER_VIEW":
      console.log("In movie add" + action.payload.result);
      state = {
        ...state,
        playPerViewList: action.payload.result
      };
      break;
    case "TOP_TEN_MOVIES":
      state = {
        ...state,
        topTenMovies: action.payload
      };
      break;

    case "DISPLAY_MOVIES":
      state = {
        ...state,
        displayMovies: action.payload
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
