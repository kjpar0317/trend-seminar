package com.innogrid.common.handler;

import com.innogrid.common.exceptions.CustomErrorException;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CustomErrorException.class)
    protected ResponseEntity<ErrorResponse> handleMethodArgumentNotValidException(CustomErrorException ex) {
        return ResponseEntity.ok(ErrorResponse.builder(ex, HttpStatusCode.valueOf(ex.getErrorCode()), ex.getMessage()).build());
    }
}
