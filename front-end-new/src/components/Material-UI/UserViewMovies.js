import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddNewMovie from './../AddNewMovie';
import ViewInUser from './ViewInUser';
import {movieData} from "../../reducers/reducer-movie";
import * as getData from "../../actions/movieAction";

const styles = {
    container: {
        textAlign: "center"
    }
};


class UserViewMovies extends React.Component {


	constructor(props){
        super(props);
        this.state= {
			highlyRatedMovies: [],
			mostPopularMovies:[],
			panel:"",
			type:""
        }
    }

	componentWillReceiveProps(nextProps) {
		console.log(nextProps);
		if(nextProps.type){
			this.setState({
				type : nextProps.type
			});
		}
        if(nextProps.movieData.data.highlyRatedMovies){
            this.setState({
				highlyRatedMovies : nextProps.movieData.data.highlyRatedMovies
            });
		}
		if(nextProps.movieData.data.mostPopularMovies){
            this.setState({
				mostPopularMovies : nextProps.movieData.data.mostPopularMovies
            });
        }
    }
    componentWillMount(){
        console.log(this.props);
		this.props.getHighlyRatedMovies();
		this.props.getMostPopularMovies();
    }


    render() {
		const { movieData } = this.props;

        return (
            <div style={styles.container} class="mt40">
			{this.state.type === 'HR' ?
			<ViewInUser viewList={this.state.highlyRatedMovies}/>
			:
			<ViewInUser viewList={this.state.mostPopularMovies}/>
		}
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
    return bindActionCreators(getData,dispatch)

}

export default connect(mapStateToProps,mapDispatchToProps)(UserViewMovies);