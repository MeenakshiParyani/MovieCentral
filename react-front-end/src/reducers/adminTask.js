import * as Constants from '../constants/constants'
import {combineReducers} from 'redux';



function vendor(vendors = [], action) {

    switch (action.type) {

        default :
            return vendors;

    }
}


function user(users=[], action){

    switch (action.type) {

        case Constants.ALL_USERS :
            return action.payload.data;

        case Constants.DELETE_USER :
            const userslist=[
                ...users.slice(0, action.index),
                ...users.slice(action.index + 1)
            ]
            return userslist;


        default:
            return users;
    }
}


const adminTask = combineReducers({user});
export default adminTask;
