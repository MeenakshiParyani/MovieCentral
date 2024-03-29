import axios from "axios/index";

export function newMovie(movie){
    return dispatch => {
        return axios.post('/api/movie/addMovie',movie).then((response)=>{
        });
    }
}

export function editMovie(movie){
    return dispatch => {
        return axios.post('/api/movie/editMovie',movie).then((response)=>{
        });
    }
}

export function filterMovies(movie){
    return dispatch => {
        return axios.post('/api/movie/filter',movie).then((response)=>{
            console.log("addMovie"+JSON.stringify(response));
            dispatch(allMovies(response.data));
        });
    }
}

export function rateNow(ratingDetails){
    return dispatch => {
        return axios.post('/api/movie/review',ratingDetails).then((response)=>{

        });
    }
}



export function getCustomerValidity (customer_id, movie_id) {
    return dispatch => {
      return axios
        .get("/api/movie/is_movie_play_allowed", {
          params: { customerId: customer_id,
           movieId:movie_id}
        })
        .then(response => {
            dispatch(validityInfo(response.data));
        });
    };
  }
  

export function getPlaysPerMovie() {
  return dispatch => {
    return axios.get('/api/movie/no_of_play_per_movie').then((response) => {
        console.log(response);
        dispatch(playsPerView(response.data));
    });
  };
}

export function getHighlyRatedMovies() {
    return dispatch => {
      return axios.get('/api/movie/scoreboard/highlyRatedMovies').then((response) => {
          console.log(response);
          dispatch(highlyRatedMovie(response.data));
      });
    };
  }

  export function getMostPopularMovies() {
    return dispatch => {
      return axios.get('/api/movie/scoreboard/mostPopularMovies').then((response) => {
          console.log(response);
          dispatch(mostPopularMovies(response.data));
      });
    };
  }

export function getMovieInfo(id) {
    return dispatch => {
      return axios.get('/api/movie/getMovieByID',{
          params: { id: id }
        }).then(response => {
            
        dispatch(movieInfo(response.data));
      });
    };
  }

export function getAllMovies() {
    return dispatch => {
        return axios.get('/api/movie/searchAll').then(response => {
            dispatch(allMovies(response.data));
        });
    };
}


  export function getTopTenMovies(type) {
    return dispatch => {
      return axios.get('/api/movie/most_played_movies',{
        params: { type: type }
      }).then(response => {
        dispatch(topTenMovies(response.data));
      });
    };
  }


  export function deleteMovie(id) {
    return dispatch => {
      return axios.get('/api/movie/deleteMovie',{
          params: { id: id }
        }).then(response => {
            
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


export function movieInfo(res){
    return{
        type:"MOVIE_INFO",
        payload:res
    }
}

export function validityInfo(res){
    return{
        type:"VALIDITY_INFO",
        payload:res
    }
}

export function allMovies(res){
    return{
        type:"ALL_MOVIES",
        payload:res
    }
}

export function highlyRatedMovie(res){
    return{
        type:"HIGHLY_RATED_MOVIES",
        payload:res
    }
}

export function mostPopularMovies(res){
    return{
        type:"MOST_POPULAR_MOVIES",
        payload:res
    }
}