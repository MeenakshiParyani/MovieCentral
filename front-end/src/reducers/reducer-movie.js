import {combineReducers} from 'redux';

export const data = (state =  {
    id: "",
    title: "",
	message:""
}, action) =>{

	switch (action.type) {
		case "MOVIE_ADD":
			console.log("In movie add"+action.payload.message);
		default:
            return state;
	}
}
export default combineReducers({
    data
});