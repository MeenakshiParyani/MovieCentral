import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddNewMovie from './../AddNewMovie';
import UserTableView from './UserTableView';
import CustomerSearch from './CustomerSearch';
import {customerData} from "../../reducers/reducer_customer";
import * as getData from "../../actions/customerAction";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});


class UserActivityPanel extends React.Component {

  	constructor(props){
        super(props);
        this.state= {
            topTenCustomers: [],
            period:""
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps.customerData){
            this.setState({
                topTenCustomers : nextProps.customerData.data.topTenCustomers
            });
        }
    }
    componentWillMount(){
        console.log(this.props);
        //this.props.getTopTenCustomers();
        //this.props.getTopTenMovies();
        //this.props.getMovieDetails(movie_id);
    }

    getCusts(type){
        this.props.getTopTenCustomers(type);
    }

    updatePeriod(e){
        this.setState({
            period : e.target.value
        },this.getCusts(e.target.value));
    }


    render() {
		const { customerData } = this.props;
        return (
            <div>

				<ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Customers Search</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
						{/*<Link to="/getPlayHistory/1" class="">User Activity</Link>*/}
						<CustomerSearch/>
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <br/>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>View most active users</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                        <select onChange={this.updatePeriod.bind(this)} value={this.state.period}>
                            <option>Select Period</option>
                            <option value="DAY">Last 24 hours</option>
                            <option value="WEEK">Last one week</option>
                            <option value="YEAR">Last one month</option>
                        </select>
                        <UserTableView viewList={this.state.topTenCustomers}/>


                {/* <Paper >
                    <Table>
                        <TableHead>
                            <TableRow><TableCell>Serial Number</TableCell>
                                <TableCell >Customer Name</TableCell>
                                <TableCell>Play Count</TableCell></TableRow>


                        </TableHead>
                        <TableBody>
                        {this.props.topTenCustomers && this.props.topTenCustomers.length > 0 ?
                        <div>
                            {this.props.topTenCustomers && this.props.topTenCustomers.map((row,i) => {
                                return (
                                    <TableRow key={i}>
                                        <TableCell component="th" scope="row">
                                            {i+1}
                                        </TableCell >
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.playCount}</TableCell>
                                    </TableRow>
                                );
                            })}
                            </div>
                            :""}
                        </TableBody>
                    </Table>
                </Paper> */}

                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <br/>
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

export default connect(mapStateToProps,mapDispatchToProps)(UserActivityPanel);