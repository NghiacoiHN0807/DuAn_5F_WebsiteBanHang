package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.LoaiSp;
import com.example.fullstackbackend.services.LoaispSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@Controller
@RequestMapping("/loai-sp/")
public class LoaiSpController {
    @Autowired
    private LoaispSevice loaispSevice;

    @GetMapping("view-all")
    public String viewAll(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer size, @RequestParam("p") Optional<Integer> p, Model model) {
        LoaiSp chatlieu = new LoaiSp();
        model.addAttribute("add", chatlieu);

        Page<LoaiSp> chatlieus = loaispSevice.chatlieuPage(p.orElse(page), size);
        model.addAttribute("LoaiSP", chatlieus);
        return "LoaiSP";
    }

    @PostMapping("add")
    public String add(@ModelAttribute("add") LoaiSp chatlieu) {
        loaispSevice.add(chatlieu);
        return "redirect:/loai-sp/view-all";
    }

    @GetMapping("detail/{id}")
    public String detail(@PathVariable("id") Integer id, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer size, @RequestParam("p") Optional<Integer> p, Model model) {

        LoaiSp chatlieu1 = new LoaiSp();
        model.addAttribute("add", chatlieu1);

        Optional<LoaiSp> chatlieu = loaispSevice.detail(id);
        model.addAttribute("getOne", chatlieu.get());

        Page<LoaiSp> chatlieus = loaispSevice.chatlieuPage(p.orElse(page), size);
        model.addAttribute("LoaiSP", chatlieus);

        return "LoaiSP";
    }

    @GetMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id, Model model) {
        loaispSevice.delete(id);
        return "redirect:/loai-sp/view-all";
    }

    @GetMapping("view-update/{id}")
    public String viewUpdate(@PathVariable("id") Integer id, Model model) {

        LoaiSp chatlieu1 = new LoaiSp();
        model.addAttribute("update", chatlieu1);

        Optional<LoaiSp> chatlieu = loaispSevice.detail(id);
        model.addAttribute("getOne", chatlieu.get());

        return "Update-LoaiSP";
    }

    @PostMapping("update")
    public String update(@ModelAttribute("update") LoaiSp chatlieu) {
        loaispSevice.update(chatlieu);
        return "redirect:/loai-sp/view-all";
    }
}
