/*import React from 'react'
import {createStore} from 'redux'
import * as Actions from './actions/action'
import store from './store/store'

// Log the initial state
console.log(store.getState())

// Every time the state changes, log it in the console
// Note that subscribe() returns a function for unregistering the listener
store.subscribe(() =>
    console.log(store.getState())
)

//Sample structure for the objects
//please make changes in it if needed
var card = {
    objectType: "CARD",
    objectID: 1,
    cardType: "Credit/Debit",
    provider: "Master/Visa",
    cardNo: 123456789,
    cvv: 123,
    expirationDate: 12,
    expirationMonth: 2,
    cardHolderName: "Sunil Tiwari",
    zip: 95126
}

var car = {
    objectType: "CAR",
    objectID: 2,
    name: "Toyota Canary",
    type: "Economy/Compact/SUV/Intermediate",
    seatingCapacity: 3,
    luggageCapacity: 2,
    doors: 4,
    price: 100,
    availability: [
        {
            date: "20-12-2017"
        }
    ],
    isAutomatic: true,
    hasAC: true,
    hasWiFi: true,
    stars: 3
}

var hotel = {
    objectType: "HOTEL",
    objectID: 3,
    roomType:"1BR/2BR/3BR/SUITES",
    guestCapacity:3,
    price:100,
    city:"San Jose",
    State: "California",
    Country:"USA",
    availability: [
        {
            date: "20-12-2017"
        }
    ],
    hasAC:true,
    hasWIFI: true,
    hasParking:true,
    hasPool:true,
    hasGym:true,
    isBreakFastComplementary:true,
    isSmokingAllowed:true,
    isPetAllowed:true,
    starts:4


}

var flight = {
    objectType: "FLIGHT",
    objectID: 4,
    airlinesName:"Lufthansa",
    flightNo: 123,
    travelClass: "Business/First/PremiumEconomy/Economy",
    takeOfTime: "20:13:00",
    landTime: "20:13:00",
    availability: [
        {
            date: "20-12-2017"
        }
    ],
    noOfSeatAvailable:30,
    starts:3

}

var carBooking = {
    objectType: "BOOKING",
    objectID: 5,
    object:[car],
    bookingDate:"20-12-2017",
    bookingTime:"20:13:00",
    paymentMethod:[card]
}

var hotelBooking = {
    objectType: "BOOKING",
    objectID: 5,
    object:[hotel],
    bookingDate:"20-12-2017",
    bookingTime:"20:13:00",
    paymentMethod:[card]
}

var flightBooking = {
    objectType: "BOOKING",
    objectID: 5,
    object:[flight],
    bookingDate:"20-12-2017",
    bookingTime:"20:13:00",
    paymentMethod:[card]
}

var booking = {
    objectType: "BOOKING",
    objectID: 5,
    object:[flight],
    bookingDate:"20-12-2017",
    bookingTime:"20:13:00",
    paymentMethod:[card]
}

var isLoggedIn= true;
var isAdmin= false;
var firstName= "Sunil";
var lastName= "Tiwari";
var email= "sunil.tiwari@sjsu.edu";
var password = "Sunil28";


// Dispatch some actions
store.dispatch(Actions.signIn(isLoggedIn, isAdmin, firstName, lastName, email, password, card,[carBooking],
    [hotelBooking],[flightBooking],[car],[hotel],[flight],[booking]));

*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import AdminPanel from "./components/adminpanel";

import { createStore } from 'redux';
import reducer from './reducers/rootreducer';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
         <Router>
         <MuiThemeProvider>
            <div>
                <Route exact path="/" component={AdminPanel}/>
                <Route exact path="/admin" component={AdminPanel}/>
            </div>
            </MuiThemeProvider>
     </Router>
    </Provider>
    ,
    document.getElementById('root')
);
