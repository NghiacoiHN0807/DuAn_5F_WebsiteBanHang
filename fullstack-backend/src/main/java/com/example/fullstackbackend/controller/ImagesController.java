package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.Images;
import com.example.fullstackbackend.services.ImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/images/api/")
@CrossOrigin("http://localhost:3000/")
public class ImagesController {

    @Autowired
    private ImagesService imagesService;

    @GetMapping("views")
    Page<Images> getAll(@RequestParam(value = "page", defaultValue = "0") Integer pageNo, @RequestParam(value = "size", defaultValue = "5") Integer size) {
        return imagesService.getAll(pageNo, size);
    }

}
