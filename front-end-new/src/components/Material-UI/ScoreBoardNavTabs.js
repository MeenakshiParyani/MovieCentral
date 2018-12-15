import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import NoSsr from '@material-ui/core/NoSsr';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import UserViewMovies from './UserViewMovies';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

function LinkTab(props) {
    return <Tab component="a" onClick={event => event.preventDefault()} {...props} />;
}

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        color: '#d67612'
    },
    container: {
        textAlign: "center"
    }
});

class ScoreBoardNavTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <NoSsr>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Tabs fullWidth value={value} onChange={this.handleChange}>
                            <LinkTab label="Highly Rated Movies (Last 30 days)" href="page1"/>
                            <LinkTab label="Most Popular Movies (Last 30 days)" href="page2" />
                        </Tabs>
                    </AppBar>
                    {value === 0 && <TabContainer>
                        <UserViewMovies type={"HR"}/>
                    </TabContainer>}
                    {value === 1 && <TabContainer>
                        <UserViewMovies type={"MP"}/>
                    </TabContainer>}
                </div>
            </NoSsr>
        );
    }
}

ScoreBoardNavTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScoreBoardNavTabs);