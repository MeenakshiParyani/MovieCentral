import {combineReducers} from 'redux';

export const data = (state =  {
    movieInfo:{},
	message:"",
	playPerViewList:[],
	topTenMovies:[]
}, action) =>{

	switch (action.type) {
		case "MOVIE_ADD":
			console.log("In movie add"+action.payload.message);
			state = {
				...state,
				message: action.payload.message
			  };
			  break;
		case "MOVIE_PLAY_PER_VIEW":
			state = {
				...state,
				playPerViewList: action.payload
			  };
			  break;
		case "TOP_TEN_MOVIES":
			state = {
				...state,
				topTenMovies: action.payload
			  };
			  break;
		
		default:
            return state;
	}
}
export default combineReducers({
    data
});