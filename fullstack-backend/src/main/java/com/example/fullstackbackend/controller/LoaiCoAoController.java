package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.LoaiCoAo;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.LoaiCoAoService;
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
@RequestMapping("/loai-co-ao/")
public class LoaiCoAoController {

    @Autowired
    private LoaiCoAoService loaiCoAoService;

    @GetMapping("view-all")
    public Page<LoaiCoAo> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                  @RequestParam(defaultValue = "5") Integer size,
                                  @RequestParam("p") Optional<Integer> p) {
        return loaiCoAoService.loaiCoAoPage(p.orElse(page), size);
    }

    @GetMapping("listCoAo")
    public List<LoaiCoAo> listCoAo() {
        return loaiCoAoService.getAll();
    }

    @PostMapping("add")
    public LoaiCoAo add(@Valid @RequestBody LoaiCoAo loaiCoAo,
                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return loaiCoAoService.add(loaiCoAo);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<LoaiCoAo> detail(@PathVariable("id") Integer id) {
        return loaiCoAoService.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!loaiCoAoService.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            loaiCoAoService.delete(id);
            return "";
        }
    }

    @PutMapping("update")
    public LoaiCoAo update(@RequestBody LoaiCoAo loaiCoAo) {
        return loaiCoAoService.update(loaiCoAo);
    }
}
