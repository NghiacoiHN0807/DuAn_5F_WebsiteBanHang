package com.example.fullstackbackend.services;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface CloudinaryService {
    public String upload(MultipartFile file) throws IOException;
    public void delete(String publicId);
}
