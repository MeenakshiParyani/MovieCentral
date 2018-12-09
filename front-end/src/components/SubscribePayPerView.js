import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import axios from 'axios/index';

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
};

class SubscribePayPerView extends Component {

    constructor() {
        super();
        this.state = {
            movie_id: '',
            price: '5.0'
        }
    }



    handleSubmit(e) {

        let subscribePayPerViewAPI = "/api/customer/subscribe-payperview";
        let apiPayload = {};
        apiPayload.movieId = 2;
        apiPayload.customerId = 2;
        apiPayload.price = '5';


        axios.post(subscribePayPerViewAPI, apiPayload)
            .then(res => {
                alert("Successful");
                this.props.sendResult(res.data.result)
            })
            .catch(err => {
                console.error(err);
            });


        e.preventDefault();
    }

    componentWillMount(){
console.log(this.props.match.params.movie_id);
let movie_id = this.props.match.params.movie_id;
this.setState({
    movieId : this.props.match.params.movie_id,
    price: '5'
});
    }

    render() {
        return (<div>
            <Card >
                <CardContent>
                    <Typography variant="h6" component="h8">
                        Pay-per-view rate is $5
        </Typography>
                    <Typography variant="h6" component="h8">
                    </Typography>
                </CardContent>
            </Card>
            <Card >
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        Enter your card details below
        </Typography>
                    <Typography variant="h6" component="h8">
                        Name on card
          <br />
                        <TextField></TextField>
                    </Typography>
                    <Typography variant="h6" component="h8">
                        Card details
          <br />
                        <TextField></TextField>
                    </Typography>
                    <Typography variant="h6" component="h8">
                        Expiration date
        <br />
                        <TextField></TextField>
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={this.handleSubmit}>Pay</Button>
                </CardActions>
            </Card>
        </div>
        );
    }
}


export default SubscribePayPerView;