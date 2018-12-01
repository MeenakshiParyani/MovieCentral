import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as getData from '../actions/movieAction';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {bindActionCreators} from "redux";
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = {
    container: {
        textAlign: "center"
    }
};




class AddNewMovie extends React.Component{
	constructor(props){
        super(props);
        this.state={
            title:"",
            synopsys:"",
            genre:"",
            releaseYear:"",
            studio:"",
			imageUrl:"",
			movieUrl:"",
			averageRating:"",
			country:"",
			type:"",
			price:"",
			mpaaRating:"",
			actors:"",
			director:"",
			mpaaRatingData: [
                {key:'G',value: 'G'},
                {key:'PG',value: 'PG'},
                {key:'PG_13',value: 'PG_13'},
                {key:'R',value: 'R'},
                {key:'NC_17',value: 'NC_17'}
            ],
			genreData: [
                {key:'ACTION',value: 'ACTION'},
                {key:'ADVENTURE',value: 'ADVENTURE'},
                {key:'COMEDY',value: 'COMEDY'},
                {key:'DRAMA',value: 'DRAMA'},
                {key:'CRIME',value: 'CRIME'},
                {key:'EPICS',value: 'EPICS'},
                {key:'HORROR',value: 'HORROR'},
                {key:'SCIENCE_FICTION',value: 'SCIENCE_FICTION'},
                {key:'WAR',value: 'WAR'}
            ],
			movieTypeData: [
                {key:'PAY_PER_VIEW',value: 'PAY_PER_VIEW'},
                {key:'SUBSCRIPTION_ONLY',value: 'SUBSCRIPTION_ONLY'},
                {key:'FREE',value: 'FREE'},
                {key:'PAID',value: 'PAID'}
            ],
			statusData: [
                {key:'ACTIVE',value: 'ACTIVE'},
                {key:'INACTIVE',value: 'INACTIVE'}
            ],
        }

    }


	    componentWillReceiveProps(nextProps){
        console.log(nextProps);
        if(nextProps.moviesData){
            if(nextProps.moviesData.data.movieInfo){
                this.setState ({
                    title:nextProps.moviesData.data.movieInfo.title,
                    synopsys:nextProps.moviesData.data.movieInfo.synopsys,
                    genre:nextProps.moviesData.data.movieInfo.genre,
                    releaseYear:nextProps.moviesData.data.movieInfo.releaseYear,
                    studio:nextProps.moviesData.data.movieInfo.studio,
                    imageUrl:nextProps.moviesData.data.movieInfo.imageUrl,
                    movieUrl:nextProps.moviesData.data.movieInfo.movieUrl,
                    averageRating:nextProps.moviesData.data.movieInfo.averageRating,
                    country:nextProps.moviesData.data.movieInfo.country,
                    type:nextProps.moviesData.data.movieInfo.type,
					price:nextProps.moviesData.data.movieInfo.price,
					mpaaRating:nextProps.moviesData.data.movieInfo.mpaaRating,
					actors:nextProps.moviesData.data.movieInfo.actors,
                    director:nextProps.moviesData.data.movieInfo.director
                });
            }
        }
    }
	
	    componentWillMount(){
        //let movie_id = this.props.match.params.movie_id;
        //this.props.getMovieDetails(movie_id);
    }
	
	onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

	
	addMovie(e){
		e.preventDefault();

		// var movie = {
		// "title":"kkhh",
		// "genre":"ACTION",
		// "releaseYear":1994,
		// "studio":"Ramoji",
		// "synopsys":"romantic good movie",
		// "imageUrl":"data:image/png;base64",
		// "movieUrl":"data:image/png;base64iVBORw0KGgoA",
		// "averageRating":5,
		// "country":"India",
		// "type":"PAID",
		// "price":100,
		// "mpaaRating":"PG",
		// "actors":"aaaa bbbb,ssss Ddff,aefrgf sgrth",
		// "director":"Sanjay Leela Bhansali",
		// "status":"ACTIVE"
		// };
		//
		// this.props.newMovie(movie);
	}


        
	
	render(){
        const { classes } = this.props;

		return(
            <div  style={styles.container}>
                <h1>Add New Movie</h1>
				<form style={{marginBottom:'40px'}}>
                    <TextField
                        id="outlined-name"
                        label="Movie Title"
                        value={this.state.title}
                        name="title"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        variant="outlined"
                        style = {{width: 500}}
                    /><br />
                    <TextField
                        id="outlined-name"
                        label="Movie Genre"
                        value={this.state.genre}
                        name="genre"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
                    /><br />
                    <TextField
                        id="outlined-name"
                        label="Release Year"
                        value={this.state.releaseYear}
                        name="releaseYear"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
                    /><br />
                    <TextField
                        id="outlined-name"
                        label="Synopsys"
                        value={this.state.synopsys}
                        name="synopsys"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
                    /><br />
                    <TextField
                        id="outlined-name"
                        label="Movie Actors"
                        value={this.state.actors}
                        name="actors"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
                    /><br />
                    <TextField
                        id="outlined-name"
                        label="Studio"
                        value={this.state.studio}
                        name="studio"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
                    /><br />
                    <TextField
                        id="outlined-name"
                        label="Movie Image URL"
                        value={this.state.imageUrl}
                        name="imageUrl"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
                    /><br />
                    <TextField
                        id="outlined-name"
                        label="Movie URL"
                        value={this.state.movieUrl}
                        name="movieUrl"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
                    /><br />
                    <TextField
                        id="outlined-name"
                        label="Average rating"
                        value={this.state.averageRating}
                        name="averageRating"
                        style = {{width: 500}}
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        variant="outlined"
                    /><br />
                    <TextField
                        id="outlined-name"
                        label="Type of movie"
                        value={this.state.type}
                        name="type"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
                    /><br />
                    <TextField
                        id="outlined-name"
                        label="Price of movie"
                        value={this.state.price}
                        name="price"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
                    /><br />
                    <TextField
                        id="outlined-name"
                        label="MPAA rating"
                        value={this.state.mpaaRating}
                        name="mpaaRating"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
                    /><br />
                    <TextField
                        id="outlined-name"
                        label="Director"
                        value={this.state.director}
                        name="director"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
                    /><br/>
                {/*<button className="btn btn-warning mt20" onClick={this.addMovie.bind(this)}>Add Movie</button>*/}
                    <Button variant="contained" size="large" color="primary"  onClick={this.addMovie.bind(this)}>
                        Add Movie
                    </Button>
                </form>
			</div>
		)
	}
}

function mapStateToProps(state){
    return{
        movieData : state.MovieReducer
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(getData,dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(AddNewMovie);