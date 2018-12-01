import {combineReducers} from 'redux';

export const data = (state =  {
    customerInfo:{},
	moviePlayingHistory:[],
	topTenCustomers:[]
}, action) =>{

	switch (action.type) {
		case "CUSTOMER_INFO":
			console.log("In customer info"+action.payload);
			state = {
				...state,
				customerInfo: action.payload
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
}
export default combineReducers({
    data
});