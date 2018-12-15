import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import "./../App.css";
import * as getData from '../actions/movieAction';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {bindActionCreators} from "redux";
import NavTabs from './Material-UI/NavTabs';
import PrimarySearchAppBar from "./searchbar";


class ErrorPage extends React.Component{
    render() {
        return (
            <div className="container-fluid">
            <PrimarySearchAppBar/>
               Oye dont mess with the routes.
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
export default connect(mapStateToProps,mapDispatchToProps)(ErrorPage);