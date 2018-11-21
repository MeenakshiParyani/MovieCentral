package com.movie.central.MovieCentral.exceptions;

import com.movie.central.MovieCentral.response.Response;
import org.apache.tomcat.util.ExceptionUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.text.ParseException;

@ControllerAdvice(basePackages = {"com.movie.central.MovieCentral"})
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(value = {CustomerAlreadyExistsException.class})
    public org.springframework.http.ResponseEntity handleConflict(Exception ex) {
        Response errorDetails = new Response(ex.getMessage(), HttpStatus.CONFLICT);
        return new org.springframework.http.ResponseEntity(errorDetails, errorDetails.getStatus());
    }

    @ExceptionHandler(value = {CustomerNotFoundException.class})
    public org.springframework.http.ResponseEntity handleCustomerNotFound(Exception ex) {
        Response errorDetails = new Response(ex.getMessage(), HttpStatus.NOT_FOUND);
        return new org.springframework.http.ResponseEntity(errorDetails, errorDetails.getStatus());
    }

    @ExceptionHandler(value = {ParseException.class})
    public org.springframework.http.ResponseEntity handleDateParseException(Exception ex) {
        String body = "Please specify valid date";
        Response errorDetails = new Response(body, HttpStatus.BAD_REQUEST);
        return new org.springframework.http.ResponseEntity(errorDetails, errorDetails.getStatus());
    }


    @ExceptionHandler(value = {Exception.class})
    public final org.springframework.http.ResponseEntity handleAllExceptions(Exception ex, WebRequest request) {
        Response errorDetails = new Response(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        return new org.springframework.http.ResponseEntity(errorDetails, errorDetails.getStatus());
    }


}
