package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.Images;
import org.springframework.data.domain.Page;

public interface ImagesService {

    Page<Images> getAll(Integer pageNo, Integer size);

}
