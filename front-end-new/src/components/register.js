import React from "react";
import { render } from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PrimarySearchAppBar from "./searchbar";
import { customerData } from "./../reducers/reducer_customer";
import * as getData from "./../actions/customerAction";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  container: {
    textAlign: "center"
  }
};

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open : false,
      open1:false,
      redirectLogin:false
    };
  }

  componentWillMount(){
    //this.handleIsLoggedIn();
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClose = () => {
    this.setState({ open: false });
};
  register(e) {
    e.preventDefault();
    this.props.registerUser(this.state)
    .then(res => {
      console.log(res);
      this.setState({
        open1: true,
        open:false
       });
    })
    .catch(err => {
      console.log(this.state.message);
      if(err &&  err.response && err.response.data)
      this.setState({
        open : true,
        errMsg : err.response.data.message
      });
        // alert(err.response.data.message)
      else
      this.setState({
        open : true,
        errMsg : "Error registering user"
      });
        // alert("Error logging in user")
    });

  }

  handleOK(){
    this.setState({
      redirectLogin : true
    });
  }

  render() {
    const { customerData } = this.props;

    
    if(sessionStorage.getItem("userRole")=="CUSTOMER" || sessionStorage.getItem("userRole")=="ADMIN")
          return (<Redirect to={{
                pathname: '/landing'
          }} />)

    if(this.state.redirectLogin)
            return (<Redirect to={{
                pathname: '/login'
          }} />)


    return (
      <div>
        <PrimarySearchAppBar/>
      <div style={styles.container}>
        <h1>Register User</h1>
        <form style={{ marginBottom: "40px" }} noValidate autoComplete="off">
          <TextField
            id="outlined-name"
            label="Name"
            value={this.state.name}
            name="name"
            onChange={this.onChange.bind(this)}
            margin="normal"
            variant="outlined"
            style={{ width: 500 }}

          />
          <br />
          <TextField
            id="outlined-name"
            label="Email"
            required
            value={this.state.email}
            name="email"
            type = "email"
            onChange={this.onChange.bind(this)}
            margin="normal"
            style={{ width: 500 }}
            variant="outlined"
          />
          <br />
          <TextField
            id="outlined-name"
            label="Screen Name"
            value={this.state.screenName}
            name="screenName"
            onChange={this.onChange.bind(this)}
            margin="normal"
            style={{ width: 500 }}
            variant="outlined"
            fullWidth
          />
          <br />
          <TextField
            id="outlined-name"
            label="Password"
            required
            value={this.state.password}
            type="password"
            name="password"
            onChange={this.onChange.bind(this)}
            margin="normal"
            style={{ width: 500 }}
            variant="outlined"
            fullWidth
          />
          <br />

          <br />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.register.bind(this)}
          >
            Register User
          </Button>
        </form>
      </div>
      <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown = {true}
          disableBackdropClick = {true}
        >
          <DialogTitle id="alert-dialog-title">{"Unable to Signup"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.errMsg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Okay
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
          <DialogTitle id="alert-dialog-title">{"User Registered Successfully"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please check your email to activate the account.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleOK.bind(this)} color="primary">
              Okay
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    customerData: state.CustomerReducer
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(getData, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);
