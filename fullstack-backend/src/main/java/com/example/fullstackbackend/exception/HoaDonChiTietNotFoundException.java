package com.example.fullstackbackend.exception;

public class HoaDonChiTietNotFoundException extends RuntimeException{
    public HoaDonChiTietNotFoundException(Integer id){
        super("Could not found the HDCT with id: "+id);
    }
}
