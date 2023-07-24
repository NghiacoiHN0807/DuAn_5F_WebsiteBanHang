package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.ChatLieu;
import com.example.fullstackbackend.repository.ChatlieuRepository;
import com.example.fullstackbackend.services.ChatlieuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChatlieuServiceImpl implements ChatlieuService {

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
    public ChatLieu add(ChatLieu chatlieu) {
        return chatlieuRepository.save(chatlieu);
    }

    @Override
    public void delete(Integer id) {
        chatlieuRepository.deleteById(id);
    }

    @Override
    public ChatLieu update(ChatLieu update) {
        return chatlieuRepository.save(update);
    }

    @Override
    public Optional<ChatLieu> detail(Integer id) {
        Optional<ChatLieu> chatlieu = chatlieuRepository.findById(id);
        return chatlieu;
    }

    @Override
    public Boolean checkExists(Integer id) {
        return chatlieuRepository.existsById(id);
    }

}
