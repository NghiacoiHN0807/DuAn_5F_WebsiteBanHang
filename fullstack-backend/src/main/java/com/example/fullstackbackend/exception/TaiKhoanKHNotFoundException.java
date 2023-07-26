package com.example.fullstackbackend.exception;

public class TaiKhoanKHNotFoundException extends RuntimeException{
    public TaiKhoanKHNotFoundException(Integer id){
        super("Could not found the Tai Khoan Khach Hang with id: "+id);
    }
}
