import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { movieData } from "../reducers/reducer-movie";
import * as getData from "../actions/movieAction";
import Grid from "@material-ui/core/Grid";
import StarRatingComponent from "react-star-rating-component";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import ReactPlayer from "react-player";
import axios from "axios";
// import { API_KEY } from "../../Secret";

class GetMovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      moviesList: [],
      genres: []
    };
  }

  componentWillMount() {
    this.props.displayMovies();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.movieData.data.displayMovies.result);
    if (nextProps.movieData.data.displayMovies.result) {
      this.setState({
        moviesList: nextProps.movieData.data.displayMovies.result
      });
    }
  }

  handleChange = e => {
    this.setState({
      releaseYears: e.target.value
    });
  };

  handleClick = e => {
    console.log(this.state.genre);
    let data = {
      genres: [this.state.genres],
      releaseYears: [],
      actors: [],
      directors: [],
      mpaaRatings: [],
      averageRatings: null
    };
  };
  // axios
  //   .post("http://localhost:8080/api/movie/filter", data)
  //   .then(response => {
  //     console.log("Movies : ", response);
  //   })

  render() {
    const { movieData } = this.props;
    return (
      <div id="search" className="Search">
        <TextField
          id="outlined-name"
          label="Search"
          value={this.state.query}
          name="query"
          // onChange={this.onChange.bind(this)}
          margin="normal"
          style={{ width: 500 }}
          variant="outlined"
        />
        <br />
        <TextField
          id="outlined-name"
          label="Genre"
          value={this.state.releaseYears}
          name="Search by.."
          onChange={this.handleChange}
          margin="normal"
          variant="outlined"
          style={{ width: 500 }}
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={this.handleClick}
        >
          Search
        </Button>
        <hr />
        {this.state.moviesList && this.state.moviesList.length > 0 ? (
          <div>
            {this.state.moviesList &&
              this.state.moviesList.map((movie, i) => {
                return (
                  <div class="m20 inline-block p20 h400">
                    <label key={i}>
                      <img
                        className="img-fluid img-thumbnail"
                        src={movie.imageUrl}
                        alt="https://rawapk.com/wp-content/uploads/2018/09/Movie-HD-Icon.png"
                        onError={e => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://rawapk.com/wp-content/uploads/2018/09/Movie-HD-Icon.png";
                        }}
                        style={{
                          width: "310px",
                          height: "300px"
                        }}
                      />
                      <label> Movie Title : {movie.title}</label>
                      <br />
                      <label> Release Year : {movie.releaseYear}</label>
                      <br />
                      <label>
                        {" "}
                        Rating -
                        <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          value={movie.rating}
                        />
                      </label>
                      <br />
                      <Button variant="contained" size="small" color="primary">
                        Add Movie
                      </Button>
                    </label>
                  </div>
                );
              })}
          </div>
        ) : (
          <label>jwjghsdfkl</label>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    movieData: state.MovieReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(getData, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GetMovieList);
