package com.raduisi.fullstack.exceptions;

public class NotFoundException extends RuntimeException{
    public NotFoundException(Long id)
    {
        super("Entry with id " + id + " not found.");
    }
}
