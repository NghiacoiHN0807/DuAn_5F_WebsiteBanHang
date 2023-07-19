package com.example.fullstackbackend.exception;

public class DiaChiNotFoundException extends RuntimeException{
    public DiaChiNotFoundException(Integer id){
        super("Could not found the Dia Chi with id: "+id);
    }
}
