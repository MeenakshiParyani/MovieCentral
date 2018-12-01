import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as getData from '../actions/movieAction';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {bindActionCreators} from "redux";


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
        let movie_id = this.props.match.params.movie_id;
        //this.props.getMovieDetails(movie_id);
    }
	
	onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        });
    }

	
	addMovie(e){
		e.preventDefault();
		var movie = {
		"title":"kkhh",
		"genre":"ACTION",
		"releaseYear":1994,
		"studio":"Ramoji",
		"synopsys":"romantic good movie",
		"imageUrl":"data:image/png;base64",
		"movieUrl":"data:image/png;base64iVBORw0KGgoA",
		"averageRating":5,
		"country":"India",
		"type":"PAID",
		"price":100,
		"mpaaRating":"PG",
		"actors":"aaaa bbbb,ssss Ddff,aefrgf sgrth",
		"director":"Sanjay Leela Bhansali",
		"status":"ACTIVE"
		};
		
		this.props.newMovie(movie);
	}
        
	
	render(){
		return(
            <div className="container-fluid">
                <h1 className="text-center">Add New Movie</h1>
				<form className="col-md-offset-3 col-md-6 add-movie-form" style={{marginBottom:'40px'}}>
                <input
                    className="form-control"
                    placeholder="Enter Movie Name"
                    type="text"
                    required
                    label=""
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange.bind(this)}
                />
				<input
                    className="form-control"
                    placeholder="Add Genre"
                    type="text"
                    required
                    label=""
                    name="genre"
                    value={this.state.genre}
                    onChange={this.onChange.bind(this)}
                />
				<input
                    className="form-control"
                    placeholder="Add Release Year"
                    type="text"
                    required
                    label=""
                    name="releaseYear"
                    value={this.state.releaseYear}
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="Add Synopsys"
                    type="url"
                    required
                    label=""
                    name="synopsys"
                    value={this.state.synopsys}
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="Add Movie Characters seperated by comma"
                    type="text"
                    required
                    label=""
                    name="actors"
                    value={this.state.actors}
                    onChange={this.onChange.bind(this)}
                />
                <input
                    className="form-control"
                    placeholder="Add Studio"
                    type="text"
                    required
                    label=""
                    name="studio"
                    value={this.state.studio}
                    onChange={this.onChange.bind(this)}
                />
				<input
                        className="form-control"
                        placeholder="Add Movie Image URL"
                        type="text"
                        required
                        label=""
                        name="imageUrl"
                        value={this.state.imageUrl}
                        onChange={this.onChange.bind(this)}
                    />
					<input
                        className="form-control"
                        placeholder="Add Movie URL"
                        type="text"
                        required
                        label=""
                        name="movieUrl"
                        value={this.state.movieUrl}
                        onChange={this.onChange.bind(this)}
                    />
                <input
                    className="form-control"
                    placeholder="Average rating"
                    type="text"
                    required
                    label=""
                    name="averageRating"
                    value={this.state.averageRating}
                    onChange={this.onChange.bind(this)}
                />
                
                <input
                    className="form-control"
                    placeholder="Add Type of movie"
                    type="text"
                    required
                    label=""
                    name="type"
                    value={this.state.type}
                    onChange={this.onChange.bind(this)}
                />
                    <input
                        className="form-control"
                        placeholder="Add Price"
                        type="text"
                        required
                        label=""
                        name="price"
                        value={this.state.price}
                        onChange={this.onChange.bind(this)}
                    />
					<input
                        className="form-control"
                        placeholder="Add MPAA rating"
                        type="text"
                        required
                        label=""
                        name="mpaaRating"
                        value={this.state.mpaaRating}
                        onChange={this.onChange.bind(this)}
                    />
                    <input
                        className="form-control"
                        placeholder="Add Director"
                        type="text"
                        required
                        label=""
                        name="director"
                        value={this.state.director}
                        onChange={this.onChange.bind(this)}
                    />
                <button className="btn btn-warning mt20" onClick={this.addMovie.bind(this)}>Add Movie</button>
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