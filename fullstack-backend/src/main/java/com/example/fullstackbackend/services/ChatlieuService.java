package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.ChatLieu;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ChatlieuService {
    List<ChatLieu> getAll();

    Page<ChatLieu> chatlieuPage(Integer pageNo, Integer size);

    ChatLieu add(ChatLieu add);

    void delete(Integer id);

    ChatLieu update(ChatLieu update);

    Optional<ChatLieu> detail(Integer id);

    Boolean checkExists(Integer id);

}
