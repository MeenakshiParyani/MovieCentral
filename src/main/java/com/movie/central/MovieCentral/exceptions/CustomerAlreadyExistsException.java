package com.movie.central.MovieCentral.exceptions;

public class CustomerAlreadyExistsException extends Exception{
    @Override
    public String getMessage() {
        return "Customer with this email already exists, please use another email";
    }
}
