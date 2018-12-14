import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {movieData} from "../../reducers/reducer-movie";
import * as getData from "../../actions/movieAction";


const styles = {
    container: {
        textAlign: "center"
    }
};


class ViewInUser extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            viewList: [],
            panel:""
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps){
             this.setState({
                 viewList : nextProps.viewList
             });
         }
    }
    componentWillMount(){
        console.log(this.props);
        //this.props.getPlaysPerMovie();
        //this.props.getMovieDetails(movie_id);
    }

    render() {
        const { movieData } = this.props;
        return (
            <div   style={styles.container}>
            <div>  
                {this.state.viewList && this.state.viewList.length>0 ?
                <div>
                    {this.state.viewList.map((movieObj,i) => {
						return (
							<div  style={{ display: 'inline-flex' }}  class="play-history-tile">
							<div>
							<img
								  className="img-fluid img-thumbnail"
								  src={movieObj.imageUrl}
								  alt="http://placehold.it/400x300"
								  style={{
									width: '110px',
									height: '100px'
								  }}
								/>
								</div>
								<div style={{textAlign:'left'}} class="ml30">
								<label class="bold-font" style={{marginTop:10}}> Movie Title : {movieObj.name}</label>
								<div style={{marginTop:10}}><label> Actors : </label> 
									{movieObj.actors.map((row,i) => {
											return (
												<label key={i}>
													<label> {row}, </label> 
												</label>
											);
										})}
								</div>
								<div style={{marginTop:10}}><label>Director : {movieObj.director}</label></div>
                                <div style={{marginTop:10}}><label>Genre : {movieObj.genre}</label></div>
								</div>
								
								</div>
						);
					})}
                </div>
            :
            <h2>No Movies Found</h2>
            }
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
    return bindActionCreators(getData,dispatch)

}

export default connect(mapStateToProps,mapDispatchToProps)(ViewInUser);