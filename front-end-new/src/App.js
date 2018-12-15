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
import Landing from "./components/Landing";
import CustomerPlayHistory from './components/Material-UI/CustomerPlayHistory';
import ViewMovieDetails from './components/Material-UI/ViewMovieDetails';
import SubscribePayPerView from './components/SubscribePayPerView';
import Subscription from './components/Subscription';
import MovieScoreBoard from './components/Material-UI/MovieScoreBoard';
import temporaryLogic from './components/temporaryLogic';
import ErrorPage from './components/ErrorPage';
import CustomerDetails from "./components/Material-UI/CustomerDetails";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          {/*<Home/>*/}
          {/* <PrimarySearchAppBar/> */}
          <Route exact path="/" render={() => (
                      <div>
                         <PrimarySearchAppBar/>
                         <img src="https://assets.nflxext.com/ffe/siteui/vlv3/ce576f63-f84d-4d38-ba8c-2034ffd002f5/e048a956-ef72-45c7-b620-ad084eba25c3/US-en-20181126-popsignuptwoweeks-perspective_alpha_website_small.jpg" />
                      </div>
                  )}/>
          <Route path={`/addMovie`} component={AddNewMovie} />
          <Route path={`/editMovie/:movie_id`} component={AddNewMovie} />
          <Route path={`/adminDashboard`} component={AdminDashboard} />
          <Route path={"/register"} component={Register} />
          <Route path={"/login"} component={Login} />
          <Route path={"/landing"} component={Landing} />
          <Route path={`/getPlayHistory/:user_id`} component={CustomerPlayHistory}></Route>
        	<Route path={`/movie-details/:movie_id`} component={ViewMovieDetails}></Route>
          <Route path={"/payperview/:movie_id"} component={SubscribePayPerView} />
          <Route path={"/subscribe/:movie_id"} component={Subscription}/>
          <Route path={"/movieScoreBoard"} component={MovieScoreBoard}/>
          <Route path={"/errorPage"} component={ErrorPage}/>
            <Route path={"/logic"} component={temporaryLogic}/>
            <Route path={"/userDetails"} component={CustomerDetails} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
