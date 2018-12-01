import * as Constants from '../constants/constants'

export function signIn(action) {

    return {
        type: Constants.SIGN_IN,
        payload: action
    }
};



export function allUsers(data) {
    return{
        type: Constants.ALL_USERS,
        payload : data
    }

}

export function deleteUser(index) {

    return {
        type : Constants.DELETE_USER,
        index : index
    }
};
