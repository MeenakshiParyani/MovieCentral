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
import { loginData } from "./../reducers/reducer_customer";
import * as getData from "./../actions/customerAction";

const styles = {
  container: {
    textAlign: "center"
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  login(e) {
    e.preventDefault();
    this.props.loginUser(this.state);
  }

  render() {
    const { loginData } = this.props;

    return (
      <div style={styles.container}>
        <h1>Login</h1>
        <form style={{ marginBottom: "40px" }}>
          <TextField
            id="outlined-name"
            label="Email"
            value={this.state.email}
            name="email"
            onChange={this.onChange.bind(this)}
            margin="normal"
            variant="outlined"
            style={{ width: 500 }}
          />
          <br />
          <TextField
            id="outlined-name"
            label="Password"
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.onChange.bind(this)}
            margin="normal"
            style={{ width: 500 }}
            variant="outlined"
          />
          <br />

          <br />
          {/*<button className="btn btn-warning mt20" onClick={this.addMovie.bind(this)}>Add Movie</button>*/}
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.login.bind(this)}
          >
            Login
          </Button>
        </form>
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
)(Login);
