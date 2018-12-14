import React from "react";
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { fade } from "@material-ui/core/styles/colorManipulator";
import { withStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Redirect } from "react-router-dom";
import {customerData} from "./../reducers/reducer_customer";
import * as getData from "./../actions/customerAction";

const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class PrimarySearchAppBar extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      shouldRedirectToLogin: false,
      shouldRedirectToRegister: false
    };
    //this.sportsCornerPanel= this.sportsCornerPanel.bind(this);
}
  

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleSignupRedirect = () => {
    this.setState({
      shouldRedirectToRegister: true
    });
  }

  handleLoginRedirect = () => {
    this.setState({
      shouldRedirectToLogin: true
    });
  }
  
  componentWillMount(){
    console.log(this.props);
  }


  signOut(){
    this.props.signOut()
    .then(res => {
      console.log(res);
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem('userRole');
      console.log(this.state.message);
      this.setState({
        shouldRedirectToLogin: true
       });
    });
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };


  mScoreDirect(){
    this.setState({
      shouldRedirectToScoreBoard : true
    });
  }

  addMovie(){
    this.setState({
      shouldRedirectToAddMovie : true
    });
  }

  viewDashboard(){
    this.setState({
      shouldRedirectToDashboard : true
    });
  }
  shouldRedirectToLanding
  myAccount(){
    this.setState({
      shouldRedirectToMyAccount : true
    });
  }
  onLanding(){
    this.setState({
      shouldRedirectToLanding : true
    });
  }

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const { customerData } = this.props;

    if(this.state.shouldRedirectToLogin)
        return (<Redirect to={{
            pathname: '/login'
    }} />)

    if(this.state.shouldRedirectToRegister)
        return (<Redirect to={{
            pathname: '/register'
    }} />)

    if(this.state.shouldRedirectToScoreBoard)
        return (<Redirect to={{
      pathname: '/movieScoreBoard'
    }} />)
    if(this.state.shouldRedirectToAddMovie)
        return (<Redirect to={{
      pathname: '/addMovie'
    }} />)
    if(this.state.shouldRedirectToDashboard)
        return (<Redirect to={{
      pathname: '/adminDashboard'
    }} />)
    if(this.state.shouldRedirectToMyAccount)
        return (<Redirect to={{
      pathname: '/userDetails'
    }} />)
    if(this.state.shouldRedirectToLanding)
        return (<Redirect to={{
      pathname: '/landing'
    }} />)
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
      if()
      {!sessionStorage.getItem('userRole') || sessionStorage.getItem("userId") === "" ?
      <div>
        <MenuItem onClick={this.handleLoginRedirect}>Login</MenuItem>
        <MenuItem onClick={this.handleSignupRedirect}>Signup</MenuItem>
        </div>
          :
          <MenuItem onClick={this.signOut.bind(this)}>Signout</MenuItem>
          }
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMobileMenuOpen}
        onClose={this.handleMobileMenuClose}
      >
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton color="inherit">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem onClick={this.handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
              onClick={this.onLanding.bind(this)}
            >
              Movies
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                
              </div>
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            {sessionStorage.getItem('userRole') === 'CUSTOMER'?
            <div class="display-inline-flex">
            <Typography
              className={classes.title}
              style={{marginRight:30,cursor:'pointer',marginTop:5}}
              variant="h6"
              color="inherit"
              noWrap
              onClick={this.mScoreDirect.bind(this)}
            >
              Movies Scoreboard
            </Typography>

            <Typography
              className={classes.title}
              style={{marginRight:30,cursor:'pointer',marginTop:5}}
              variant="h6"
              color="inherit"
              noWrap
              onClick={this.myAccount.bind(this)}
            >
               My Account
            </Typography>
            </div>
            :
            <div>
            {sessionStorage.getItem('userRole') === 'ADMIN'?
            <div class="display-inline-flex">
            <Typography
              className={classes.title}
              style={{marginRight:30,cursor:'pointer',marginTop:5}}
              variant="h6"
              color="inherit"
              noWrap
              onClick={this.addMovie.bind(this)}
            >
              Add Movie
            </Typography>

            <Typography
              className={classes.title}
              style={{marginRight:30,cursor:'pointer',marginTop:5}}
              variant="h6"
              color="inherit"
              noWrap
              onClick={this.viewDashboard.bind(this)}
            >
               View Dashboard
            </Typography>
            </div>
            :
            ""
          }
          </div>
            }
            
              <IconButton
                aria-owns={isMenuOpen ? "material-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-haspopup="true"
                onClick={this.handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

PrimarySearchAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};


function mapStateToProps(state){
  return{
      customerData : state.CustomerReducer
  };
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(getData,dispatch)

}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(PrimarySearchAppBar));

// export default withStyles(styles)(PrimarySearchAppBar);
