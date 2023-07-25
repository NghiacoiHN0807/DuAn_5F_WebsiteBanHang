package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.Images;
import com.example.fullstackbackend.repository.ImagesRepository;
import com.example.fullstackbackend.services.ImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ImagesServiceImpl implements ImagesService {

    @Autowired
    private ImagesRepository imagesRepository;

    @Override
    public Page<Images> getAll(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return imagesRepository.findAll(pageable);
    }
}
