import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {NavLink, BrowserRouter, Route, Link} from 'react-router-dom';
import AddNewMovie from './components/AddNewMovie';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
	  {/*<header className="App-header">
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
	  </header>*/}
	  <BrowserRouter>
              <div className="display-inline row justify-content-md-center">
			              <div className="brand-bar">
              <div className="row container">
                <div className="width-25 right">
                </div>
              </div>
            </div>
				<Header/>
                  <Route path={`/addMovie`} component={AddNewMovie}></Route>
              </div>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
