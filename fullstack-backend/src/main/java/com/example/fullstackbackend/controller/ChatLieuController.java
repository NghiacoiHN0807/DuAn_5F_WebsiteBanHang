package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChatLieu;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.ChatlieuService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/chat-lieu/")

public class ChatLieuController {
    @Autowired
    private ChatlieuService chatlieuService;

    @GetMapping("view-all")
    public Page<ChatLieu> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                @RequestParam(defaultValue = "5") Integer size,
                                @RequestParam("p") Optional<Integer> p) {
        return chatlieuService.chatlieuPage(p.orElse(page), size);
    }

    @GetMapping("listCL")
    public List<ChatLieu> listCL() {
        return chatlieuService.getAll();
    }

    @PostMapping("add")
    public ChatLieu add(@Valid @RequestBody ChatLieu chatLieu,
                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return chatlieuService.add(chatLieu);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<ChatLieu> detail(@PathVariable("id") Integer id) {
        return chatlieuService.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!chatlieuService.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            chatlieuService.delete(id);
            return "";
        }
    }

    @PutMapping("update")
    public ChatLieu update(@RequestBody ChatLieu chatLieu) {
        return chatlieuService.update(chatLieu);
    }
}
