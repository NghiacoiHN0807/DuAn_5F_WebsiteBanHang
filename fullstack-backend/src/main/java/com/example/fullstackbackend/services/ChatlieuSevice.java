package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.ChatLieu;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ChatlieuSevice {
    List<ChatLieu> getAll();

    Page<ChatLieu> chatlieuPage(Integer pageNo, Integer size);

    void add(ChatLieu add);

    void delete(Integer id);

    void update(ChatLieu update);

    Optional<ChatLieu> detail(Integer id);

}
