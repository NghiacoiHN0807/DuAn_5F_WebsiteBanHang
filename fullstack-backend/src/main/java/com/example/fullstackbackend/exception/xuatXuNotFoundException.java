package com.example.fullstackbackend.exception;

public class xuatXuNotFoundException extends RuntimeException{
    public xuatXuNotFoundException(Integer id){
        super("Could not found with id: "+id);
    }
}
