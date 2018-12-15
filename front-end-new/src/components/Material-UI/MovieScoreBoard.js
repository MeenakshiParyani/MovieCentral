import React from 'react';
import {render} from 'react-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import "./../../App.css";
import * as getData from '../../actions/movieAction';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import {bindActionCreators} from "redux";
import ScoreBoardNavTabs from './ScoreBoardNavTabs';
import PrimarySearchAppBar from "./../searchbar";
import * as getCustomerData from '../../actions/customerAction';


class MovieScoreBoard extends React.Component{

    constructor(props){
        super(props);
        this.state={}
    }


    componentWillMount(){
        this.handleIsLoggedIn();
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

    if(this.state.redirectLogin)
        return (<Redirect to={{
            pathname: '/login'
      }} />)

        return (
            <div>
                <PrimarySearchAppBar/>
            <div className="container-fluid">
                <ScoreBoardNavTabs/>
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
    return bindActionCreators(Object.assign({}, getData,getCustomerData),dispatch)

}
export default connect(mapStateToProps,mapDispatchToProps)(MovieScoreBoard);