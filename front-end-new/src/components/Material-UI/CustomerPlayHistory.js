import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddNewMovie from './../AddNewMovie';
import UserTableView from './UserTableView';
import {customerData} from "../../reducers/reducer_customer";
import * as getData from "../../actions/customerAction";
import PrimarySearchAppBar from "./../searchbar";

const styles = {
    container: {
        textAlign: "center"
    }
};


class CustomerPlayHistory extends React.Component {


	constructor(props){
        super(props);
        this.state= {
            moviePlayingHistory: [],
			userId:""
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.customerData.data.moviePlayingHistory);
		if(nextProps.userId){
			this.setState({
				userId : nextProps.userId
			});
		}
        if(nextProps.customerData){
            this.setState({
                moviePlayingHistory : nextProps.customerData.data.moviePlayingHistory
            });
        }
    }
    componentWillMount(){
		console.log(this.props);
		this.handleIsLoggedIn();
        this.props.getPlayHistory(this.props.match.params.user_id);
        //this.props.getTopTenMovies();
        //this.props.getMovieDetails(movie_id);
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


    render() {
		const { customerData } = this.props;

		if(this.state.redirectLogin)
            return (<Redirect to={{
                pathname: '/login'
          }} />)

        return (
			<div>
				<PrimarySearchAppBar/>
            <div style={styles.container} class="mt40">
			<h2 >Movie Playing History</h2>
			<div>  
				{this.state.moviePlayingHistory && this.state.moviePlayingHistory.length > 0 ?
				<div>
					{this.state.moviePlayingHistory.map((movieObj,i) => {
						return (
							<div  style={{ display: 'inline-flex' }}  class="play-history-tile">
							<div>
							<img
								  className="img-fluid img-thumbnail"
								  src={movieObj.movie.imageUrl}
								  alt="http://placehold.it/400x300"
								  style={{
									width: '110px',
									height: '100px'
								  }}
								/>
								</div>
								<div style={{textAlign:'left'}} class="ml30">
								<label class="bold-font"> Movie Title : {movieObj.movie.title}</label>
								<div> Actors :  
									{movieObj.movie.actors.map((row,i) => {
											return (
												<label key={i}>
													<label> {row.name}, </label> 
												</label>
											);
										})}
								</div>
								<div>Director : {movieObj.movie.director.name}</div>
								<div>Play time : {movieObj.playTime.slice(0, 1)} / {movieObj.playTime.slice(1, 2)} / {movieObj.playTime.slice(2, 3)}, {movieObj.playTime.slice(3, 4)} : {movieObj.playTime.slice(4, 5)} : {movieObj.playTime.slice(5, 6)}</div>
								</div>
								
								</div>
								
						);
					})}
				</div>
			:
			<h4>No play history for this user as of now.</h4>}
			</div>
			
            </div>
			</div>
        );
    }
}


function mapStateToProps(state){
    return{
        customerData : state.CustomerReducer
    };
}

function mapDispatchToProps(dispatch){
    return bindActionCreators(getData,dispatch)

}

export default connect(mapStateToProps,mapDispatchToProps)(CustomerPlayHistory);