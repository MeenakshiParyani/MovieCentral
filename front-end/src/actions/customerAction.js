import axios from "axios/index";

export function getTopTenCustomers() {
  return dispatch => {
    return axios.get('/api/customer/get_most_active_customers').then(response => {
      dispatch(topTenCustomers(response.data));
    });
  };
}

export function getCustomerInfo(customer_id) {
  return dispatch => {
    return axios.get('/api/customer/get-customer-details',{
        params: { customer_id: customer_id }
      }).then(response => {
      dispatch(customerInfo(response.data));
    });
  };
}


export function getPlayHistory(customer_id) {
  return dispatch => {
    return axios.get('/api/customer/get-customer-watch-history',{
        params: { customer_id: customer_id }
      }).then(response => {
      dispatch(customerPlayHistory(response.data));
    });
  };
}

export function topTenCustomers(res){
    return{
        type:"TOP_TEN_CUSTOMERS",
        payload:res
    }
}

export function customerInfo(res){
    return{
        type:"CUSTOMER_INFO",
        payload:res
    }
}

export function customerPlayHistory(res){
    return{
        type:"MOVIE_PLAYING_HISTORY",
        payload:res
    }
}