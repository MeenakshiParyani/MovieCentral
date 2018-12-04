import React, { Component } from "react";
import logo from "./logo.svg";
import PrimarySearchAppBar from "./components/searchbar";
import Home from "./components/home";
import "./App.css";
import { NavLink, BrowserRouter, Route, Link } from "react-router-dom";
import AddNewMovie from "./components/AddNewMovie";
import AdminDashboard from "./components/AdminDashboard";
import Register from "./components/register";
import Login from "./components/login";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/*<Home/>*/}
          <PrimarySearchAppBar>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="https://reactjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn React
                </a>
              </header>
            </div>
          </PrimarySearchAppBar>

          <Route path={`/addMovie`} component={AddNewMovie} />
          <Route path={`/adminDashboard`} component={AdminDashboard} />
          <Route path={"/register"} component={Register} />
          <Route path={"/login"} component={Login} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
