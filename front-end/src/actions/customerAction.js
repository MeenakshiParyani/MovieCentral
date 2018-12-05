import axios from "axios/index";

export function getTopTenCustomers() {
  return dispatch => {
    return axios
      .get("/api/customer/get_most_active_customers")
      .then(response => {
        dispatch(topTenCustomers(response.data));
      });
  };
}

export function getCustomerInfo(customer_id) {
  return dispatch => {
    return axios
      .get("/api/customer/get-customer-details", {
        params: { customer_id: customer_id }
      })
      .then(response => {
        dispatch(customerInfo(response.data));
      });
  };
}

export function registerUser(user) {
  return dispatch => {
    return axios.post("/api/customer/register", user).then(response => {
      dispatch(register(response.data));
    });
  };
}

export function loginUser(user) {
  return dispatch => {
    return axios
      .post("http://localhost:8080/api/customer/login", user)
      .then(response => {});
  };
}

export function getPlayHistory(customer_id) {
  return dispatch => {
    return axios
      .get("/api/customer/get-customer-watch-history", {
        params: { customer_id: customer_id }
      })
      .then(response => {
        dispatch(customerPlayHistory(response.data));
      });
  };
}

export function topTenCustomers(res) {
  return {
    type: "TOP_TEN_CUSTOMERS",
    payload: res
  };
}

export function customerInfo(res) {
  return {
    type: "CUSTOMER_INFO",
    payload: res
  };
}

export function customerPlayHistory(res) {
  return {
    type: "MOVIE_PLAYING_HISTORY",
    payload: res
  };
}

export function register(res) {
  return {
    type: "REGISTER_USER",
    payload: res
  };
}
