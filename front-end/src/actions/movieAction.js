import axios from "axios/index";

export function newMovie(movie){
    return dispatch => {
        return axios.post('/api/movie/addMovie',movie).then((response)=>{
            console.log("addMovie"+JSON.stringify(response));
            dispatch(addMovie(response.data));
        });
    }
}

export function getPlaysPerMovie() {
  return dispatch => {
    return axios.get('/api/movie/no_of_play_per_movie').then(response => {
      dispatch(playsPerView(response.data));
    });
  };
}

export function getTopTenMovies() {
  return dispatch => {
    return axios.get('/api/movie/most_played_movies').then(response => {
      dispatch(topTenMovies(response.data));
    });
  };
}


export function addMovie(res){
    return{
        type:"MOVIE_ADD",
        payload:res
    }
}

export function playsPerView(res){
    return{
        type:"MOVIE_PLAY_PER_VIEW",
        payload:res
    }
}

export function topTenMovies(res){
    return{
        type:"TOP_TEN_MOVIES",
        payload:res
    }
}

