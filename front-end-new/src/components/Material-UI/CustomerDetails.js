import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import {Link, Redirect} from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {customerData} from "../../reducers/reducer_customer";
import * as getData from "../../actions/customerAction";
import PrimarySearchAppBar from "./../searchbar";


const styles = {
    container: {
        textAlign: "center"
    }
};


class CustomerDetails extends React.Component {

    constructor(props){
        super(props);
        this.state= {
            customerInfo: [],
            panel:""
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps){
             this.setState({
                customerInfo : nextProps.customerData.data.customerInfo
             });
         }
    }
    componentWillMount(){
        console.log(this.props);
        
        let userId = sessionStorage.getItem("userId");
        
        this.props.getCustomerInfo(userId);
        //this.props.getMovieDetails(movie_id);
    }

    render() {
        const { customerData } = this.props;
        // alert("asd");
        return (
            <div>
                <PrimarySearchAppBar/>
            <div   style={styles.container}>
            
            <h1>Customer Details</h1>
            <Paper style={{marginTop:100}}>
                <Table style={{ width: 800, margin: 'auto' }}>
                    
                    <TableBody>
                       
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                    Customer Name
                                    </TableCell >
                                    <TableCell>{this.state.customerInfo.name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                    Email
                                    </TableCell >
                                    <TableCell>{this.state.customerInfo.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                    Screen Name
                                    </TableCell >
                                    <TableCell>{this.state.customerInfo.screenName}</TableCell>
                                </TableRow>
                                {this.state.customerInfo.registrationDateTime && this.state.customerInfo.registrationDateTime.length > 0 ?
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                    Resgistration Date
                                    </TableCell >
                                    <TableCell>
                                    {(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(Date.UTC(this.state.customerInfo.registrationDateTime.slice(0, 1), this.state.customerInfo.registrationDateTime.slice(1, 2), this.state.customerInfo.registrationDateTime.slice(2, 3), this.state.customerInfo.registrationDateTime.slice(3, 4), this.state.customerInfo.registrationDateTime.slice(4, 5), this.state.customerInfo.registrationDateTime.slice(5, 6)))))}
                                    </TableCell>
                                </TableRow>   : "" 
                            }
                                
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                    Subscription End Time
                                    </TableCell >
                                    <TableCell style={{fontWeight:700}}>
                                    {this.state.customerInfo.subscriptionEndTime && this.state.customerInfo.subscriptionEndTime.length > 0 ?
                                    <h4>{(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(new Date(Date.UTC(this.state.customerInfo.subscriptionEndTime.slice(0, 1), this.state.customerInfo.subscriptionEndTime.slice(1, 2), this.state.customerInfo.subscriptionEndTime.slice(2, 3), this.state.customerInfo.subscriptionEndTime.slice(3, 4), this.state.customerInfo.subscriptionEndTime.slice(4, 5), this.state.customerInfo.subscriptionEndTime.slice(5, 6)))))}</h4>
                                    : <div>No Active Subscriptions 
                                        <div class="m10"><Link to={'/subscribe/'}  target="_blank">Subscribe Now </Link></div>
                                    </div>
                                }
                                    </TableCell>
                                </TableRow> 
                    </TableBody>
                </Table>
            </Paper>
            </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(CustomerDetails);