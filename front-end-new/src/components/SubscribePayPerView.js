import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios/index';
import CreditCardTemplate from './CreditCardTemplate';
import Grid from '@material-ui/core/Grid';
import { Redirect } from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PrimarySearchAppBar from "./searchbar";
import {customerData} from "./../reducers/reducer_customer";
import * as getData from "./../actions/customerAction";


const styles = theme => ({
    paper: {
      position: 'absolute',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
  });


class SubscribePayPerView extends Component {

    constructor() {
        super();
        this.state = {
            movie_id: '',
            price: '5.0',
            open: false,
            open1 : false,
            errMsg : "",
            redirectBack:false
        }
    }


    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };

    
    


    handleSubmit(e) {

        let apiPayload = {};
        apiPayload.movieId = this.props.match.params.movie_id;
        apiPayload.customerId = sessionStorage.getItem('userId');
        apiPayload.price = '5';
        this.props.subscribePayPerView(apiPayload).then(res => {
            //alert("Payment Successful");
            // do nothing
            this.setState({
                open1: true,
                open:false,
                errMsg : "Payment was successful"
            })
          })
          .catch(err => {
            // redirect to login
            alert("Payment Unsuccessful");
            this.setState({
                redirectLanding: true,
                open: true,
                errMsg : "Payment unsuccessful"
            })
          });
        
        

        // axios.post(subscribePayPerViewAPI, apiPayload)
        //     .then(res => {
        //         this.props.sendResult(res.data.result).then(response => {
        //             alert('Payment Successful');
        //             this.setState({
        //                 redirectBack : true
        //             })
        //         })
        //     })
        //     .catch(err => {
        //         console.error(err);
        //     });


        // e.preventDefault();
        
    }

    componentWillMount() {
        console.log(this.props.match.params.movie_id);
        this.handleIsLoggedIn();
        let movie_id = this.props.match.params.movie_id;
        this.setState({
            movieId: this.props.match.params.movie_id,
            price: '5'
        });
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

      handleRedirect(){
          this.setState({
              
            redirectBack: true
          });
      }
    render() {
        const classes = this.props;
        let routeUrl = "/movie-details/"+this.props.match.params.movie_id;
        if(this.state.redirectBack)
        return (<Redirect to={{
            pathname: routeUrl
        }} />)

        if(this.state.redirectLanding)
        return (<Redirect to={{
            pathname: '/landing'
        }} />)

        if(this.state.redirectLogin)
        return (<Redirect to={{
            pathname: '/login'
        }} />)
        return (<div>
            <Grid container justify="center">
            <h4>Pay-per-view rate for this movie is $5.</h4>
            </Grid>
            <CreditCardTemplate />
            <Grid container justify="center">
                <Button size="small" onClick={this.handleClickOpen}>Pay</Button>
            </Grid>
            <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown = {true}
          disableBackdropClick = {true}
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You will be charged once you click Pay Now. 
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit.bind(this)} color="primary" autoFocus>
              Pay Now
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={this.state.open1}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown = {true}
          disableBackdropClick = {true}
        >
          <DialogTitle id="alert-dialog-title">{"Payment status"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.errMsg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleRedirect.bind(this)} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>



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


export default connect(mapStateToProps,mapDispatchToProps)(SubscribePayPerView);
// export default SubscribePayPerView;