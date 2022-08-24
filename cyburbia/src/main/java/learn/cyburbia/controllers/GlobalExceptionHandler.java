package learn.cyburbia.controllers;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.client.HttpClientErrorException;

import java.time.LocalDateTime;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ErrorResponse> handleException(DataAccessException ex) {

        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse("We can't show you the details, but something went wrong in our database. Sorry :("),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleException(IllegalArgumentException ex) {

        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse(ex.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(HttpClientErrorException.BadRequest.class)
    public ResponseEntity<ErrorResponse> handleException(HttpClientErrorException.BadRequest ex) {

        return new ResponseEntity<ErrorResponse>(
                new ErrorResponse("Something went wrong on our end. Your request failed."),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }
}