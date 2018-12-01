import React, { Component } from 'react';
import { connect } from 'react-redux';
import {NavLink, Link } from 'react-router-dom';
//let logo = require('../images/logo-1.png');

class Header extends Component {

  render() {
    var styles = {
      color: 'green'
    };
    var style1 = {
      color: 'lightblue'
    };
    return (
        <div>
            <div className="navbar-header navbar-inverse">
                <button
                    type="button"
                    className="navbar-toggle collapsed"
                    data-toggle="collapse"
                    data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false"
                >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>


            </div>
            <div id="headerwrap">
                <div className="global-header">
                    <nav className="row">
                        <div className="float-right">
                            <ul className="global-menu nav navbar-nav">
                <li className="global-menu-li">
                  <NavLink to="/add-movie" className="global-menu-li navLink">New Movies</NavLink>
                </li>
                {/*<li className="global-menu-li">
                  <NavLink to="/secure/movieUpload" className="global-menu-li navLink">Upload Movie</NavLink>
                </li>
			
                  <li className="global-menu-li">
                      
                      <NavLink to="/adminDasboard" className="global-menu-li navLink">Admin Dashboard</NavLink>
                  </li>
                  <li className="global-menu-li">
                      <NavLink to="/sudMovieHall" className="global-menu-li navLink">Search|Update|Delete Movie Hall</NavLink>
                  </li>
                  <li className="global-menu-li">
                      <NavLink to="/ViewNewMovies" className="global-menu-li navLink">New Movies</NavLink>
                  </li>
                  <li className="global-menu-li">
                      <NavLink to="/secure/movieUpload" className="global-menu-li navLink">Book Movies</NavLink>
                  </li>
                  <li className="global-menu-li">
                      <NavLink to="/User/EditProfile" className="global-menu-li navLink">My VIP Account</NavLink>
                  </li>
              

                            <li className="global-menu-li">
                    {this.renderContent()}
                </li>*/}</ul>
                        </div>
                    </nav>
                </div>
            </div>

        </div>
    );
  }
}
function mapStateToProps({ auth }) {
  return { auth };
}
export default connect(mapStateToProps)(Header);
