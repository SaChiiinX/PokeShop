package com.revature.controllers;

import com.revature.exceptions.pokemon.InvalidPokemonException;
import com.revature.exceptions.pokemon.PokemonIdExistsException;
import com.revature.exceptions.pokemon.PokemonNameExistException;
import com.revature.exceptions.pokemon.PokemonNotFoundException;
import com.revature.exceptions.user.InvalidCredentialsException;
import com.revature.exceptions.user.InvalidUserException;
import com.revature.exceptions.user.UserExistsException;
import com.revature.exceptions.user.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PokemonNotFoundException.class)
    public ResponseEntity<Void> handlePokemonNotFound(PokemonNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @ExceptionHandler(InvalidPokemonException.class)
    public ResponseEntity<Void> handleInvalidPokemonException(InvalidPokemonException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @ExceptionHandler(PokemonIdExistsException.class)
    public ResponseEntity<Void> handlePokemonIdExistsException(PokemonIdExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @ExceptionHandler(PokemonNameExistException.class)
    public ResponseEntity<Void> handlePokemonNameExistException(PokemonNameExistException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Void> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @ExceptionHandler(InvalidUserException.class)
    public ResponseEntity<Void> handleInvalidUserException(InvalidUserException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<Void> handleUserExistsException(UserExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<Void> handleUserNotFoundException(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Void> handleGenericException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }
}
