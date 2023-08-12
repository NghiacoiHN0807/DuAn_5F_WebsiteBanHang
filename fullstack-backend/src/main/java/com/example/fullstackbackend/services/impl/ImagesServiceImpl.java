package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.Images;
import com.example.fullstackbackend.repository.ImagesRepository;
import com.example.fullstackbackend.services.ImagesSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ImagesServiceImpl implements ImagesSevice {

    @Autowired
    private ImagesRepository imagesRepository;


    @Override
    public List<Images> getAll() {
        return imagesRepository.findAll();
    }

    @Override
    public List<Images> findImagesByIdSp(Integer idSp) {
        return imagesRepository.findImagesByIdSp(idSp);
    }

    @Override
    public Page<Images> imagesPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return imagesRepository.findAll(pageable);
    }

    @Override
    public Images add(Images add) {
        return imagesRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        imagesRepository.deleteById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return imagesRepository.existsById(id);
    }

    @Override
    public Images update(Images update) {
       return imagesRepository.save(update);
    }

    @Override
    public Optional<Images> detail(Integer id) {
        Optional<Images> images = imagesRepository.findById(id);
        return images;
    }

    @Override
    public List<Images> findByIdCtsp_IdSp(Integer idSp) {
        return imagesRepository.findByIdCtsp_IdSp(idSp);
    }
}
