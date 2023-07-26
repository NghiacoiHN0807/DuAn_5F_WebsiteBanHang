package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.Size;
import com.example.fullstackbackend.entity.Size;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.SizeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
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
@RequestMapping("/size/")
public class SizeController {
    @Autowired
    private SizeService sizeService;

    @GetMapping("view-all")
    public Page<Size> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                  @RequestParam(defaultValue = "5") Integer size,
                                  @RequestParam("p") Optional<Integer> p) {
        return sizeService.sizePage(p.orElse(page), size);
    }

    @GetMapping("listSize")
    public List<Size> listSize() {
        return sizeService.getAll();
    }

    @PostMapping("add")
    public Size add(@Valid @RequestBody Size size,
                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return sizeService.add(size);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<Size> detail(@PathVariable("id") Integer id) {
        return sizeService.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!sizeService.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            sizeService.delete(id);
            return "";
        }
    }

    @PutMapping("update")
    public Size update(@RequestBody Size size) {
        return sizeService.update(size);
    }
}
