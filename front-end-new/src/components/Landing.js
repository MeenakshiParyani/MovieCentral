import React from 'react';
import {connect} from 'react-redux';
import * as getData from '../actions/movieAction';
import {movieData} from "./../reducers/reducer-movie";
import {bindActionCreators} from "redux";
import StarRatingComponent from 'react-star-rating-component';
import TextField from "@material-ui/core/TextField";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Typography from "@material-ui/core/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Divider from '@material-ui/core/Divider';
import Select from 'react-select';
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import * as getCustomerData from '../actions/customerAction';
import { Redirect, Link } from "react-router-dom";
import PrimarySearchAppBar from "./searchbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Button } from '@material-ui/core';


const styles = {
    container: {
        textAlign: "center"
    }
};


class CheckBox extends React.Component {

    render() {
        return (
            <input type="checkbox" id={this.props.id} value={this.props.value} onChange={this.props.onChange} />
        )
    }

}

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

class Landing extends React.Component{
    constructor(props){
        super(props);
        this.state={
            // moviesList : []
            moviesList : [],
            errorText : "",
            mpaaRatingData: [
                {key:'G',value: 'G'},
                {key:'PG',value: 'PG'},
                {key:'PG_13',value: 'PG_13'},
                {key:'R',value: 'R'},
                {key:'NC_17',value: 'NC_17'}
            ],
            genreList: [
                {label:'ACTION',value: 'ACTION'},
                {label:'ADVENTURE',value: 'ADVENTURE'},
                {label:'COMEDY',value: 'COMEDY'},
                {label:'DRAMA',value: 'DRAMA'},
                {label:'EPICS',value: 'EPICS'},
                {label:'HORROR',value: 'HORROR'},
                {label:'SCIENCE_FICTION',value: 'SCIENCE_FICTION'},
                {label:'WAR',value: 'WAR'},
                {label:'CRIME',value: 'CRIME'}
            ],
            mpaaOptionsChecked :[],
            movieFilter :{
                keywords : "",
                releaseYear : "",
                actors : [],
                directors : [],
                mpaaRatings : [],
                genres :[],
                averageRating : ""
            },
            selectedOption: null
        }
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps);
         if(nextProps.movieData){
             if(nextProps.movieData.data.moviesList){
                 this.setState({
                    moviesList : nextProps.movieData.data.moviesList
                 });
             }
         }
    }

    componentWillMount(){
        //let movie_id = this.props.match.params.movie_id;
        this.handleIsLoggedIn();
        this.props.actions.movieAction.getAllMovies();


    }

    handleIsLoggedIn(){
      this.props.actions.customerAction.getIsLoggedIn()
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

    handleValueChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);

        console.log(this.state.movieFilter.genres);
        //let checkedArray = this.state.movieFilter.genres;
        let checkedArray = [];
        checkedArray = selectedOption;
        let selOptns = [];
        //checkedArray.push(selectedOption);
        for(let i=0; i<checkedArray.length; i++){
            selOptns.push(checkedArray[i].value);
        }
        this.setState({
            movieFilter : {
                genres: selOptns,
                keywords:this.state.movieFilter.keywords,
                releaseYear : this.state.movieFilter.releaseYear,
                mpaaRatings : this.state.movieFilter.mpaaRatings,
                averageRating : this.state.movieFilter.averageRating
            }
        },this.applyFilters);
        
        //alert(this.state.movieFilter.keywords);
    }


    onChange(e){
        this.setState({
            movieFilter :{
                keywords: e.target.value,
                genres: this.state.movieFilter.genres,
                releaseYear : this.state.movieFilter.releaseYear,
                mpaaRatings : this.state.movieFilter.mpaaRatings,
                averageRating : this.state.movieFilter.averageRating
            }
        },this.applyFilters);
        
    }

    applyFilters(){
        this.props.actions.movieAction.filterMovies(this.state.movieFilter);
    }


    changeEvent(event) {

        let checkedArray = this.state.movieFilter.mpaaRatings;
        let selectedValue = event.target.value;

        if (event.target.checked === true) {

            checkedArray.push(selectedValue);

        } else {
            let valueIndex = checkedArray.indexOf(selectedValue);
            checkedArray.splice(valueIndex, 1);   

        }
        this.setState({
            movieFilter:{
            mpaaRatings: checkedArray,
            keywords: this.state.movieFilter.keywords,
            genres: this.state.movieFilter.genres,
            releaseYear : this.state.movieFilter.releaseYear,
            averageRating : this.state.movieFilter.averageRating
        }
        },this.applyFilters);
    }

    onStarClick(nextValue, prevValue, name) {
        //alert(prevValue);
        this.setState({
            movieFilter : {
            averageRating : prevValue,
            mpaaRatings: this.state.movieFilter.mpaaRatings,
            keywords: this.state.movieFilter.keywords,
            genres: this.state.movieFilter.genres,
            releaseYear : this.state.movieFilter.releaseYear
            }
        },this.applyFilters);
    }

    onYearChange(event) {


        const re = /^[0-9\b]+$/;

        if (event.target.value=== '' || re.test(event.target.value)) {
            //alert(event.target.value);
            this.setState({yearVal: event.target.value});
            if (event.target.value.length == 4 || event.target.value ==='') {
                this.setState({
                    movieFilter:{
                    mpaaRatings: this.state.movieFilter.mpaaRatings,
                    keywords: this.state.movieFilter.keywords,
                    genres: this.state.movieFilter.genres,
                    releaseYear : event.target.value,
                    averageRating : this.state.movieFilter.averageRating
                },
                errorText: ''
            },this.applyFilters);
         } else if(this.state.movieFilter.releaseYear === ""){
            this.setState({
                movieFilter:{
                mpaaRatings: this.state.movieFilter.mpaaRatings,
                keywords: this.state.movieFilter.keywords,
                genres: this.state.movieFilter.genres,
                releaseYear : event.target.value,
                averageRating : this.state.movieFilter.averageRating
            },
            errorText: ''
        },this.applyFilters);
         }else {
              this.setState({ errorText: 'Invalid format: Year should be 4-digit number' })
            }
         }else {
            this.setState({ errorText: 'Invalid format: Year should be 4-digit number' })
          }
      }


      resetFilter(){
          this.setState({
            yearVal:"",
            movieFilter :{
                keywords : "",
                releaseYear : "",
                actors : [],
                directors : [],
                mpaaRatings : [],
                genres :[],
                averageRating : ""
            }
          },this.applyFilters);
      }

    render(){
        const { movieData } = this.props;
        //alert(this.state.movieFilter.keywords);
        const { selectedOption } = this.state;
        //alert(this.state.movieFilter.mpaaRatings);

        //alert(sessionStorage.getItem('userId'));
        let outputCheckboxes = this.state.mpaaRatingData.map(function(string, i){
            return (<div class="inline-block" style={{marginRight:15}}><CheckBox value={string.value} id={'string_' + i} onChange={this.changeEvent.bind(this)}/><label class="label-checkbox" htmlFor={'string_' + i}>{string.value}</label></div>)
        }, this);

        if(this.state.redirectLogin)
          return (<Redirect to={{
              pathname: '/login'
        }} />)

        return(
            <div>
        <PrimarySearchAppBar/>
            <div  style={styles.container}>
                <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><label class="appbar-label">Filters</label>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                            >
                                <MenuIcon />
                            </IconButton></Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            <div class="disp-inline-flex">
                            <div>
                            <div class="m20">
                            <label class="fl label-checkbox ">MPAA Rating : </label>
                            <div class="inline-block">{outputCheckboxes}</div>
                            </div><br/>
                            <div className="m20">
                                <label className="fl label-checkbox ">Genre : </label><br/>
                                <div>
                                    <Select
                                    value={selectedOption}
                                    onChange={this.handleValueChange}
                                    options={this.state.genreList}
                                    isMulti
                                /></div>
                            </div><br/>
                            </div>
                            <div class="ml160">
                            <div className="m20">
                                <label className="fl label-checkbox ">Release Year : </label>
                                <div className="inline-block"><TextField
                                    id="outlined-name"
                                    value={this.state.yearVal}
                                    placeholder="Enter Release Year"
                                    name="name"
                                    onChange={this.onYearChange.bind(this)}
                                    margin="normal"
                                    errorText= {this.state.errorText.length === 0 ? false : true }
                                    helperText={this.state.errorText}
                                    style = {{width: 500}}
                                    variant="outlined"
                                />
                                </div>
                            </div><br/>
                            <div className="m20">
                                <label className="fl label-checkbox ">Average Rating : </label><br/>
                                <div class="display-inline-block">
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={1}
                                    onStarClick={this.onStarClick.bind(this)}
                                /> & up<br/>
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={2}
                                    onStarClick={this.onStarClick.bind(this)}
                                /> & up<br/>
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={3}
                                    onStarClick={this.onStarClick.bind(this)}
                                /> & up<br/>
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={4}
                                    onStarClick={this.onStarClick.bind(this)}
                                /> & up<br/>
                                <StarRatingComponent
                                    name="rate1"
                                    starCount={5}
                                    value={5}
                                    onStarClick={this.onStarClick.bind(this)}
                                /> & up<br/>
                                </div>
                            </div>
                            <Button onClick={this.resetFilter.bind(this)}>Reset Filters</Button>
                            </div>
                            </div>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                    <TextField
                        id="outlined-name"
                        value={this.state.searchString}
                        placeholder="Enter Search String"
                        name="name"
                        onChange={this.onChange.bind(this)}
                        margin="normal"
                        style = {{width: 500}}
                        variant="outlined"
                    />
                </div>
                {
                    this.state.moviesList && this.state.moviesList.length > 0 ?
                        <div>
                            {this.state.moviesList && this.state.moviesList.map((movie,i) => {
                                return (
                                    <Link to={'/movie-details/' + movie.id}>
                                    <div class="m20 inline-block p20 h400">
                                        <label key={i}>
                                            <img
                                                className="img-fluid img-thumbnail"
                                                src={movie.imageUrl}
                                                alt="https://rawapk.com/wp-content/uploads/2018/09/Movie-HD-Icon.png"
                                                onError={(e)=>{e.target.onerror = null; e.target.src="https://rawapk.com/wp-content/uploads/2018/09/Movie-HD-Icon.png"}}
                                                style={{
                                                    width: '200px',
                                                    height: '250px'
                                                }}
                                            /><br/>
                                            <div>
                                            <label> {movie.title}</label><br/>
                                            <label> Release Year : {movie.releaseYear}</label><br/>
                                            <label> <br/>
                                                <StarRatingComponent
                                                    name="rate1"
                                                    starCount={5}
                                                    value={movie.averageRating}
                                                /></label><br/></div>
                                        </label>
                                    </div>
                                    </Link>
                                );
                            })}
                        </div>
                        :
                        <h2>No Movies Found</h2>
                }


            </div>
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
  return {
    actions: {
      movieAction: bindActionCreators(getData, dispatch),
      customerAction : bindActionCreators(getCustomerData, dispatch)
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Landing);
