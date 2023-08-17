package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.Anh;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.services.AnhService;
import com.example.fullstackbackend.services.CloudinaryService;
import com.example.fullstackbackend.services.SanPhamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @Autowired
    private AnhService anhService;

    @Autowired
    private SanPhamService sanPhamService;

    @PostMapping("upload")
    public ResponseEntity<?> upload(@RequestParam("images") MultipartFile[] images,
                                    @RequestParam("idSp")Integer idSp){
        Map<String, Object> response = new HashMap<>();
        for(MultipartFile image : images){
            if (!image.isEmpty() && anhService.checkSL()) {
                try {
                    String url = cloudinaryService.upload(image);
                    Anh anh = new Anh();
                    anh.setUrl(url);
                    anh.setIdSp(sanPhamService.detail(idSp).orElse(null));
                    anh.setTrangThai(0);
                    anhService.add(anh);
                } catch (IOException e) {
                    e.printStackTrace();
                    response.put("error", e.getMessage());
                    response.put("mensaje", "Error uploading file" );
                    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
                }
                response.put("mensaje", "Image uploaded successful" );
            }
        }

        return ResponseEntity.ok(response);
    }

        @GetMapping("delete")
        public ResponseEntity<?>  deleteImage(@RequestParam("imgName") String imgName){

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
