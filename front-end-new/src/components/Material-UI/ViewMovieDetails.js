import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Link, Redirect, withRouter} from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import {movieData} from "../../reducers/reducer-movie";
import * as getData from "../../actions/movieAction";
import Grid from '@material-ui/core/Grid';
import StarRatingComponent from 'react-star-rating-component';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import * as getCustomerData from '../../actions/customerAction';
import ReactPlayer from 'react-player';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PrimarySearchAppBar from "./../searchbar";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const stylesNew = {
    container: {
        textAlign: "center"
    }
};



const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});


class ViewMovieDetails extends React.Component {


	constructor(props){
        super(props);
        this.state= {
			movieInfo:{},
			playing: true,
			open:false,
			showMovie:false
		}
	}
	
	handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };


    componentWillReceiveProps(nextProps) {
        console.log(nextProps.movieData);
		if(nextProps.movieData.data.movieInfo){
			if(nextProps.movieData.data.movieInfo.status === 'INACTIVE'){
				this.setState({
					invalidMovie : true
				});
			}

            this.setState({
                movieInfo : nextProps.movieData.data.movieInfo
			});

			if(ReactPlayer.canPlay(nextProps.movieData.data.movieInfo.movieUrl)){
				 	this.setState({
						 showMovie : true
						 
				 	});
				 }
        }
    }
    componentWillMount(){
		console.log(this.props);
		this.handleIsLoggedIn();
        this.props.getMovieInfo(this.props.match.params.movie_id);
    }
	
	rateNow(e){
        e.preventDefault();
        if(this.state.rating == 0){
            alert("Please select number of stars");
        }
        else{
            let ratingDetails = {};
            ratingDetails.comment = this.state.comment;
            ratingDetails.rating = this.state.rating;
            ratingDetails.movieId = this.props.match.params.movie_id;
            ratingDetails.customerId = sessionStorage.getItem("userId");//this.props.match.params.movie_id;;
            this.props.rateNow(ratingDetails).then(
                (data) => {
                    this.props.getMovieInfo(this.props.match.params.movie_id);
                },
                (err) => {}
            );
        }
	}
	
	handleIsLoggedIn(){
        this.props.getIsLoggedIn()
        .then(res => {
          // do nothing
          this.setState({
            redirectLogin : false
          })
        })
        .catch(err => {
          // redirect to login
          this.setState({
            redirectLogin : true
          })
  
        })
      }
	
	onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }
	
	editMovie(){
		this.setState({
			editNow:true
		});
	}

	deleteMovie(){
		this.props.deleteMovie(this.props.match.params.movie_id).then(
			(data) => {
				alert("Movie Deleted Successfully");
				this.setState({
					toLanding : true
				});
			},
			(err) => {
				console.log(err.response);
				alert("Unable to delete movie. Please try again later.")
			}
		);
	}

	deleteMovieModal(){
		this.setState({
			deleteModal : true
		});
	}
	
	checkValidity(){
		//alert(sessionStorage.getItem("userRole"));
		if(!(sessionStorage.getItem("userRole") === 'ADMIN')){
			this.props.getCustomerValidity(sessionStorage.getItem("userId"),this.props.match.params.movie_id).then(
				(data) => {
					
				},
				(err) => {
					console.log(err.response);
					this.setState({
					playing:false,
					errMsg:err.response.data.message
				});
				this.handleOpen();
				}
			);
		}

	}
	checkPlayValidity(){
		// this.setState({
		// 	playing:true
		// });
		this.checkValidity();
	}

	payNow(){
		console.log(this.props);
		let path = "payperview/"+this.props.match.params.movie_id
		this.props.history.push(path);
	
	}

	unableToPlay(){
		alert("Cannot play requested video. PLease try again later.")
	}
	
	subscribe(){

	}
	  handleOpen = () => {
		this.setState({ open: true });
	  };

	  handleClose = () => {
		this.setState({ open: false });
	  };

	  handleDeleteClose = () => {
        this.setState({ deleteModal: false });
	  };
	  
	  componentDidMount(){
		  if(ReactPlayer.canPlay(this.state.movieInfo.movieUrl)){
			  alert("showmovie");
			  this.setState({
				  showMovie : true
			  });
		  }
	  }

    render() {
		const { movieData } = this.props;
		console.log(this.state.movieInfo.title);
		this.state.isAdmin = sessionStorage.getItem("userRole");
		let routeUrl = "/editMovie/"+this.props.match.params.movie_id;

		// if(ReactPlayer.canPlay(this.state.movieInfo.movieUrl)){
		// 	this.setState({
		// 		showMovie : true
		// 	});
		// }

        if(this.state.editNow)
        return (<Redirect to={{
            pathname: routeUrl
        }} />)

		if(this.state.toLanding)
        return (<Redirect to={{
            pathname: '/landing'
		}} />)
		
		if(this.state.invalidMovie)
        return (<Redirect to={{
            pathname: '/errorPage'
		}} />)
		
		if(this.state.redirectLogin)
            return (<Redirect to={{
                pathname: '/login'
          }} />)

		//alert(this.state.isAdmin && this.state.isAdmin === 'CUSTOMER');
        return (
			<div>
				<PrimarySearchAppBar/>
            <div class="mt40">
			<div>
			<div class="bar">Movie Details</div>
				<div>
					{ this.state.movieInfo ? 
						<div style={{display:"inline-flex"}} class="movie-details-view">
						<div>
						<img
								  className="img-fluid img-thumbnail"
								  src={this.state.movieInfo.imageUrl}
								  alt="https://rawapk.com/wp-content/uploads/2018/09/Movie-HD-Icon.png"
								  onError={(e)=>{e.target.onerror = null; e.target.src="https://rawapk.com/wp-content/uploads/2018/09/Movie-HD-Icon.png"}}
								  style={{
									width: '310px',
									height: '300px'
								  }}
								/>
						</div>
						<div class="ml100 w75">
						<div class="float-right">
						{(this.state.isAdmin && this.state.isAdmin === 'ADMIN') ?
						<div>
							<Fab color="secondary" aria-label="Edit">
							<EditIcon onClick={this.editMovie.bind(this)}>edit_icon</EditIcon>
 					    </Fab>
						<div class="mt10"></div>
						<Fab aria-label="Delete">
							<DeleteIcon onClick={this.deleteMovieModal.bind(this)} />
						</Fab>
						</div>
						:
						""
						}
						
						</div>
						
						<div class="m10 bold-font">Movie Name : {this.state.movieInfo.title}</div>
						<div class="m10">Average Rating : <StarRatingComponent
                                                        name="rate1"
                                                        starCount={5}
                                                        value={this.state.movieInfo.averageRating}
					/> - {this.state.movieInfo.averageRating} / 5</div>
						<div class="m10">Genre : {this.state.movieInfo.genre}</div>
						<div class="m10">Release Year : {this.state.movieInfo.releaseYear}</div>
						<div class="m10">MPAA Rating : {this.state.movieInfo.mpaaRating}</div>
						<div class="m10">Synopsys : {this.state.movieInfo.synopsys}</div>
						
						<div class="m10">Actors : 
							{this.state.movieInfo.actors && this.state.movieInfo.actors.map((row,i) => {
											return (
												<label key={i}>
													<label> {row.name}</label>
														{i<this.state.movieInfo.actors.length-1 ? <label>, </label> : <label></label>}
												</label>
											);
										})}
						</div>
						
						</div>
						</div>
						:
						<div></div>
					} 
				</div>
				</div>
				<div class="mt30">
				<div class="bar">Watch Movie</div>
				<Grid container justify = "center">
				{this.state.showMovie ?
				<ReactPlayer 
				id="react-player"
				url={this.state.movieInfo.movieUrl} 
				width={1000} 
				height={500} 
				controls={true}
				playing={this.state.playing}
				onError={this.unableToPlay.bind(this)}
				onStart={this.checkValidity.bind(this)}
				onPlay={this.checkValidity.bind(this)}/>
				:
				<label>There is some problem with movie video. Sorry for inconvnience. Please try other movie options.</label>
				}
				
				{/* {this.state.movieInfo.movieUrl && (!ReactPlayer.canPlay(this.state.movieInfo.movieUrl)) ?

					<ReactPlayer 
					id="react-player"
					url={this.state.movieInfo.movieUrl} 
					width={1000} 
					height={500} 
					controls={true}
					playing={this.state.playing}
					onError={this.unableToPlay.bind(this)}
					onStart={this.checkValidity.bind(this)}
					onPlay={this.checkValidity.bind(this)}/>
					:
					<label>There is some problem with movie video. Sorry for inconvnience. Please try other movie options.</label>
				} */}
				</Grid>
				</div>
				<div class="mt30">
				<div class="bar">Ratings and Reviews</div>
				<Grid container justify = "center">
				<div class="w75">
				
				<form style={{maxWidth:'none'}} onSubmit={this.rateNow.bind(this)}>
					<div>
						<h2 style={{textAlign:'left'}}>Rate the movie</h2>
						<StarRatingComponent
							required
							name="rate1"
							starCount={5}
							value={this.state.rating}
							onStarClick={this.onStarClick.bind(this)}
						/>
					</div>
					<div>
					<TextField
                        id="outlined-name"
                        value={this.state.releaseYear}
                        name="comment"
                        required
							onChange={(e) => this.setState({
								comment : e.target.value
							})}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
						placeholder="Enter the review comment"
                    />
					</div>
					<Button variant="contained" size="small" color="primary"  onClick={this.rateNow.bind(this)}>
                        Submit Rating
                    </Button>
				</form>
				<hr/>
				
				{this.state.movieInfo.ratings && this.state.movieInfo.ratings.length >0 ?
                                    <div className="details-font">
                                        {this.state.movieInfo.ratings.map((ratings,i) =>
                                            <div key={i}>
                                                {/*<div>Rating - <label className="rating-font-color">{rating.rating}/5</label></div>*/}
                                                
                                                <div class="display-inline-flex"><img src="https://openclipart.org/download/280989/user-icon.svg" /><div class="mt10">By {ratings.reviewerScreenName}</div></div>
                                                <div>
                                                    Rating -
                                                    <StarRatingComponent
                                                        name="rate1"
                                                        starCount={5}
                                                        value={ratings.rating}
                                                    />
                                                </div>
												<div>Review - <label class="overflow-wrap">{ratings.ratingComment}</label></div>
                                                <hr/>
                                            </div>)}
                                    </div>
                                        : <div className="details-font">Not Rated Yet</div>}
                                </div>
	
				</Grid>
				</div>

				<Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
		  aria-describedby="alert-dialog-description"
		  disableEscapeKeyDown = {true}
          disableBackdropClick = {true}
        >
          <DialogTitle id="alert-dialog-title">{"There seems to be a problem."}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
               
            </DialogContentText>
			<DialogContentText id="alert-dialog-description">
               {this.state.errMsg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
		  {this.state.errMsg == "Movie needs pay per view, please pay to view the movie"?
					<Link to={'/payperview/'+this.props.match.params.movie_id}  target="_blank">Pay Now</Link>
					:
					<Link to={'/subscribe/'+this.props.match.params.movie_id}  target="_blank">Subscribe</Link>
										}
          </DialogActions>
        </Dialog>
				<Dialog
					open={this.state.deleteModal}
					onClose={this.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					disableEscapeKeyDown = {true}
          disableBackdropClick = {true}
					>
					<DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete the movie? 
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleDeleteClose} color="primary">
						Cancel
						</Button>
						<Button onClick={this.deleteMovie.bind(this)} color="primary" autoFocus>
						Delete
						</Button>
					</DialogActions>
					</Dialog>

            </div>
			</div>
        );
    }
}


function mapStateToProps(state){
    return{
        movieData : state.MovieReducer
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(Object.assign({}, getData,getCustomerData),dispatch)

}


export default connect(mapStateToProps,mapDispatchToProps)(ViewMovieDetails);