package com.movie.central.MovieCentral.exceptions;

import org.springframework.http.HttpStatus;

public enum Error {

    DUPLICATE_USER(HttpStatus.CONFLICT, "User with this email already exists, please use another email"),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not registered, Please register to continue"),
    INVALID_SUBSCRIPTION_MONTHS(HttpStatus.BAD_REQUEST, "Please select atleast one month for subscription"),
    INVALID_DATE_EXCEPTION(HttpStatus.BAD_REQUEST, "Please specify valid date");


    private final HttpStatus code;
    private final String description;

    Error(HttpStatus code, String description) {
        this.code = code;
        this.description = description;
    }

    public HttpStatus getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return code + " : " + description;
    }


}
