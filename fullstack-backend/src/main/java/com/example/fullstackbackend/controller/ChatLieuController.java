package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChatLieu;
import com.example.fullstackbackend.services.ChatlieuSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
@RequestMapping("/chat-lieu/")
public class ChatLieuController {
    @Autowired
    private ChatlieuSevice chatlieuSevice;

    @GetMapping("view-all")
    public String viewAll(@RequestParam(defaultValue = "0") Integer page,
                          @RequestParam(defaultValue = "5") Integer size,
                          @RequestParam("p") Optional<Integer> p, Model model) {
        ChatLieu chatlieu = new ChatLieu();
        model.addAttribute("add", chatlieu);

        Page<ChatLieu> chatlieus = chatlieuSevice.chatlieuPage(p.orElse(page), size);
        model.addAttribute("chatlieus", chatlieus);
        return "ChatLieu";
    }

    @PostMapping("add")
    public String add(@Valid @ModelAttribute("add") ChatLieu chatlieu,
                      BindingResult bindingResult, Model model,
                      @RequestParam(defaultValue = "0") Integer page,
                      @RequestParam(defaultValue = "5") Integer size,
                      @RequestParam("p") Optional<Integer> p) {
        if (bindingResult.hasErrors()) {
            Page<ChatLieu> chatlieus = chatlieuSevice.chatlieuPage(p.orElse(page), size);
            model.addAttribute("chatlieus", chatlieus);
            return "ChatLieu";
        }else {
            chatlieuSevice.add(chatlieu);
            return "redirect:/chat-lieu/view-all";
        }
    }

    @GetMapping("detail/{id}")
    public String detail(@PathVariable("id") Integer id, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer size, @RequestParam("p") Optional<Integer> p, Model model) {

        ChatLieu chatlieu1 = new ChatLieu();
        model.addAttribute("add", chatlieu1);

        Optional<ChatLieu> chatlieu = chatlieuSevice.detail(id);
        model.addAttribute("getOne", chatlieu.get());

        Page<ChatLieu> chatlieus = chatlieuSevice.chatlieuPage(p.orElse(page), size);
        model.addAttribute("chatlieus", chatlieus);

        return "ChatLieu";
    }

    @GetMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id, Model model) {
        chatlieuSevice.delete(id);
        return "redirect:/chat-lieu/view-all";
    }

    @GetMapping("view-update/{id}")
    public String viewUpdate(@PathVariable("id") Integer id, Model model) {

        ChatLieu chatlieu1 = new ChatLieu();
        model.addAttribute("update", chatlieu1);

        Optional<ChatLieu> chatlieu = chatlieuSevice.detail(id);
        model.addAttribute("getOne", chatlieu.get());

        return "Update-ChatLieu";
    }

    @PostMapping("update")
    public String update(@ModelAttribute("update") ChatLieu chatlieu) {
        chatlieuSevice.update(chatlieu);
        return "redirect:/chat-lieu/view-all";
    }
}
