package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.Size;
import com.example.fullstackbackend.services.SizeSevice;
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
@RequestMapping("/size/")
public class SizeController {
    @Autowired
    private SizeSevice sizeSevice;

    @GetMapping("view-all")
    public String viewAll(@RequestParam(defaultValue = "0") Integer page,
                          @RequestParam(defaultValue = "5") Integer size,
                          @RequestParam("p") Optional<Integer> p, Model model) {
        Size chatlieu = new Size();
        model.addAttribute("add", chatlieu);

        Page<Size> xuatxus = sizeSevice.chatlieuPage(p.orElse(page), size);
        model.addAttribute("xuatxus", xuatxus);
        return "Size";
    }

    @PostMapping("add")
    public String add(@Valid @ModelAttribute("add") Size xuatxu,
                      BindingResult bindingResult,
                      @RequestParam(defaultValue = "0") Integer page,
                      @RequestParam(defaultValue = "5") Integer size,
                      @RequestParam("p") Optional<Integer> p, Model model) {
        if (bindingResult.hasErrors()) {
            Page<Size> xuatxus = sizeSevice.chatlieuPage(p.orElse(page), size);
            model.addAttribute("xuatxus", xuatxus);
            return "Size";
        } else {
            sizeSevice.add(xuatxu);
            return "redirect:/size/view-all";
        }

    }

    @GetMapping("detail/{id}")
    public String detail(@PathVariable("id") Integer id, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer size, @RequestParam("p") Optional<Integer> p, Model model) {

        Size xuatxu = new Size();
        model.addAttribute("add", xuatxu);

        Optional<Size> xuatxu1 = sizeSevice.detail(id);
        model.addAttribute("getOne", xuatxu1.get());

        Page<Size> chatlieus = sizeSevice.chatlieuPage(p.orElse(page), size);
        model.addAttribute("xuatxus", chatlieus);

        return "Size";
    }

    @GetMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id, Model model) {
        sizeSevice.delete(id);
        return "redirect:/size/view-all";
    }

    @GetMapping("view-update/{id}")
    public String viewUpdate(@PathVariable("id") Integer id, Model model) {

        Size xuatxu = new Size();
        model.addAttribute("update", xuatxu);

        Optional<Size> chatlieu = sizeSevice.detail(id);
        model.addAttribute("getOne", chatlieu.get());

        return "Update-Size";
    }

    @PostMapping("update")
    public String update(@ModelAttribute("update") Size xuatxu) {
        sizeSevice.update(xuatxu);
        return "redirect:/size/view-all";
    }
}
