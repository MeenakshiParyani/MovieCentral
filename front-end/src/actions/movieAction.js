import axios from "axios/index";

export function newMovie(movie){
    return dispatch => {
        return axios.post('/api/movie/addMovie',movie).then((response)=>{
            console.log("addMovie"+JSON.stringify(response));
            dispatch(movieFunc(response.data));
        });
    }
}

export function movieFunc(res){
    return{
        type:"MOVIE_ADD",
        payload:res
    }
}