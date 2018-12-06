import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddNewMovie from './../AddNewMovie';
import {movieData} from "../../reducers/reducer-movie";
import * as getData from "../../actions/movieAction";

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});



class MovieActivityPanel extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            playPerViewList: []
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps.movieData){
            this.setState({
                playPerViewList : nextProps.movieData.data.playPerViewList
            });
        }
    }
    componentWillMount(){
        console.log(this.props);
        this.props.getPlaysPerMovie();
        //this.props.getMovieDetails(movie_id);
    }

    render() {
        const { movieData } = this.props;
        return (
            <div>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Plays per movie</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            {this.state.playPerViewList.map((ts,i) =>
                                <h5 key={i}>
                                    <div>
                                        <div>{ts.id}</div>
                                        <div>{ts.name}</div>
                                        <div>{ts.playCount}</div>
                                    </div>
                                </h5>
                            )}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <br/>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Top 10 Movies</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <br/>
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

export default connect(mapStateToProps,mapDispatchToProps)(MovieActivityPanel);