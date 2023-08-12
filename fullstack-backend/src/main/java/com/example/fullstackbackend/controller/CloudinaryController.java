package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.services.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/cloudinary/")
public class CloudinaryController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("upload")
    public ResponseEntity<?> upload(@RequestParam("image") MultipartFile image){

        Map<String, Object> response = new HashMap<>();
        if (!image.isEmpty()) {
            String fileName = null;
            try {
                fileName = cloudinaryService.upload(image);
            } catch (IOException e) {
                e.printStackTrace();
                response.put("error", e.getMessage());
                response.put("mensaje", "Error uploading file" );
                return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            response.put("nombreArchivo", fileName);
            response.put("mensaje", "Image uploaded successful" );
        }
        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @GetMapping("delete")
    public ResponseEntity<?>  deleteImage(@RequestParam String imgName){

        Map<String, Object> response = new HashMap<>();
        try {
            cloudinaryService.delete(imgName);
        }catch (Exception ex){
            ex.printStackTrace();
            response.put("error", ex.getMessage());
            response.put("mensaje", "Error deleting file");
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        response.put("mensaje", "Image deleted successful");

        return new ResponseEntity<>(response,HttpStatus.CREATED);

    }
}
