package com.example.fullstackbackend.services.impl;


import com.example.fullstackbackend.entity.MauSac;
import com.example.fullstackbackend.repository.MausacRepository;
<<<<<<< HEAD
import com.example.fullstackbackend.services.MausacSevice;
=======
import com.example.fullstackbackend.services.MausacService;
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
public class MausacServiceImpl implements MausacSevice {
=======
public class MausacServiceImpl implements MausacService {
>>>>>>> main

    @Autowired
    private MausacRepository mausacRepository;

    @Override
    public List<MauSac> getAll() {
        return mausacRepository.findAll();
    }

    @Override
<<<<<<< HEAD
    public Page<MauSac> chatlieuPage(Integer pageNo, Integer size) {
=======
    public Page<MauSac> mauSacPage(Integer pageNo, Integer size) {
>>>>>>> main
        Pageable pageable = PageRequest.of(pageNo, size);
        return mausacRepository.findAll(pageable);
    }

    @Override
<<<<<<< HEAD
    public void add(MauSac add) {
        mausacRepository.save(add);
=======
    public MauSac add(MauSac add) {
        return mausacRepository.save(add);
>>>>>>> main
    }

    @Override
    public void delete(Integer id) {
        mausacRepository.deleteById(id);
    }

    @Override
<<<<<<< HEAD
    public void update(MauSac update) {
        mausacRepository.save(update);
=======
    public MauSac update(MauSac update) {
         return mausacRepository.save(update);
>>>>>>> main
    }

    @Override
    public Optional<MauSac> detail(Integer id) {
        Optional<MauSac> mausac = mausacRepository.findById(id);
        return mausac;
    }

<<<<<<< HEAD
=======
    @Override
    public Boolean checkExists(Integer id) {
        return mausacRepository.existsById(id);
    }

>>>>>>> main

}
