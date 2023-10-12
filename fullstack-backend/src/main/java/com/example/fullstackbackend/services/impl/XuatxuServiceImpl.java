package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.XuatXu;
import com.example.fullstackbackend.repository.XuatxuRepository;
<<<<<<< HEAD
import com.example.fullstackbackend.services.XuatxuSevice;
=======
import com.example.fullstackbackend.services.XuatxuService;
>>>>>>> main
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
<<<<<<< HEAD
public class XuatxuServiceImpl implements XuatxuSevice {
=======
public class XuatxuServiceImpl implements XuatxuService {
>>>>>>> main

    @Autowired
    private XuatxuRepository xuatxuRepository;


    @Override
    public List<XuatXu> getAll() {
        return xuatxuRepository.findAll();
    }

    @Override
<<<<<<< HEAD
    public Page<XuatXu> chatlieuPage(Integer pageNo, Integer size) {
=======
    public Page<XuatXu> xuatXuPage(Integer pageNo, Integer size) {
>>>>>>> main
        Pageable pageable = PageRequest.of(pageNo, size);
        return xuatxuRepository.findAll(pageable);
    }

    @Override
    public XuatXu add(XuatXu add) {
        return xuatxuRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        xuatxuRepository.deleteById(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return xuatxuRepository.existsById(id);
    }

    @Override
    public XuatXu update(XuatXu update) {
       return xuatxuRepository.save(update);
    }

    @Override
    public Optional<XuatXu> detail(Integer id) {
        Optional<XuatXu> xuatxu = xuatxuRepository.findById(id);
        return xuatxu;
    }
}
