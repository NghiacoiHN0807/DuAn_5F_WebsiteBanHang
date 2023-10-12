package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.ChatLieu;
import com.example.fullstackbackend.repository.ChatlieuRepository;
<<<<<<< HEAD
import com.example.fullstackbackend.services.ChatlieuSevice;
=======
import com.example.fullstackbackend.services.ChatlieuService;
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
public class ChatlieuServiceImpl implements ChatlieuSevice {
=======
public class ChatlieuServiceImpl implements ChatlieuService {
>>>>>>> main

    @Autowired
    private ChatlieuRepository chatlieuRepository;

    @Override
    public List<ChatLieu> getAll() {
        return chatlieuRepository.findAll();
    }

    @Override
    public Page<ChatLieu> chatlieuPage(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return chatlieuRepository.findAll(pageable);
    }

    @Override
<<<<<<< HEAD
    public void add(ChatLieu chatlieu) {
        chatlieuRepository.save(chatlieu);
=======
    public ChatLieu add(ChatLieu chatlieu) {
        return chatlieuRepository.save(chatlieu);
>>>>>>> main
    }

    @Override
    public void delete(Integer id) {
        chatlieuRepository.deleteById(id);
    }

    @Override
<<<<<<< HEAD
    public void update(ChatLieu update) {
        chatlieuRepository.save(update);
=======
    public ChatLieu update(ChatLieu update) {
        return chatlieuRepository.save(update);
>>>>>>> main
    }

    @Override
    public Optional<ChatLieu> detail(Integer id) {
        Optional<ChatLieu> chatlieu = chatlieuRepository.findById(id);
        return chatlieu;
    }
<<<<<<< HEAD
=======

    @Override
    public Boolean checkExists(Integer id) {
        return chatlieuRepository.existsById(id);
    }

>>>>>>> main
}
