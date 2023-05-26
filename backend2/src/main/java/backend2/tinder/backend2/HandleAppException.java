package backend2.tinder.backend2;

import java.util.Arrays;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.support.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import backend2.tinder.backend2.Exception.BadResultException;
import backend2.tinder.backend2.Exception.EntityExistingException;
import backend2.tinder.backend2.Exception.EntityNotFoundException;
import backend2.tinder.backend2.Exception.ErrorResponse;

@ControllerAdvice
public class HandleAppException {
    
    @ExceptionHandler({EntityNotFoundException.class, EntityExistingException.class, BadResultException.class}) 
    public ResponseEntity<Object> handlEntityException(RuntimeException ex) {
        ErrorResponse err = new ErrorResponse(Arrays.asList(ex.getMessage()));
        return new ResponseEntity<Object>(err, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handlingArgumentException(MethodArgumentNotValidException ex) {
        
        ErrorResponse err = new ErrorResponse(Arrays.asList(ex.getMessage())); 
        System.out.println(err);
        return new ResponseEntity<Object>(err, HttpStatus.BAD_REQUEST);
        
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<Object> handlingDataIntegrityException(DataIntegrityViolationException ex) {
       
       ErrorResponse err = new ErrorResponse(Arrays.asList(ex.getMessage())); 
       System.out.println(err);
        return new ResponseEntity<Object>(err, HttpStatus.BAD_REQUEST);
        
    }
    @ExceptionHandler(EmptyResultDataAccessException.class)
    public ResponseEntity<Object> handlingEntityException(EmptyResultDataAccessException ex) {
        
        ErrorResponse err = new ErrorResponse(Arrays.asList(ex.getMessage())); 
        System.out.println(err);
        return new ResponseEntity<Object>(err, HttpStatus.BAD_REQUEST);
        
    }
}
