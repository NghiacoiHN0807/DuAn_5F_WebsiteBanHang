package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.LoaiSp;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.LoaispService;
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
@RequestMapping("/loai-sp/")
public class LoaiSpController {
    @Autowired
    private LoaispService loaispService;

    @GetMapping("view-all")
    public Page<LoaiSp> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                  @RequestParam(defaultValue = "5") Integer size,
                                  @RequestParam("p") Optional<Integer> p) {
        return loaispService.loaiSpPage(p.orElse(page), size);
    }

    @GetMapping("listLSP")
    public List<LoaiSp> listLSP() {
        return loaispService.getAll();
    }

    @PostMapping("add")
    public LoaiSp add(@Valid @RequestBody LoaiSp loaiSp,
                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return loaispService.add(loaiSp);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<LoaiSp> detail(@PathVariable("id") Integer id) {
        return loaispService.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!loaispService.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            loaispService.delete(id);
            return "";
        }
    }

    @PutMapping("update")
    public LoaiSp update(@RequestBody LoaiSp loaiSp) {
        return loaispService.update(loaiSp);
    }
}
