package com.movie.central.MovieCentral.exceptions;

public class CustomerNotFoundException extends Exception{


    @Override
    public String getMessage() {
        return "Customer not registered, Please register to continue";
    }
}
