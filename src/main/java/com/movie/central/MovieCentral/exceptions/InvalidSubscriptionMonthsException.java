package com.movie.central.MovieCentral.exceptions;

public class InvalidSubscriptionMonthsException extends Exception{

    @Override
    public String getMessage() {
        return "Please select atleast one month for subscription";
    }
}
