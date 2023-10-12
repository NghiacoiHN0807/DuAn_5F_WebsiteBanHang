package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChucVu;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.ChucvuService;
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
@RequestMapping("/chuc-vu/")
@CrossOrigin("http://localhost:3000/")
public class ChucVuController {
    @Autowired
    private ChucvuService chucvuService;

    @GetMapping("view-all")
    public Page<ChucVu> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                @RequestParam(defaultValue = "15") Integer size,
                                @RequestParam("p") Optional<Integer> p) {

        return chucvuService.phanTrang(p.orElse(page), size);
    }

    @GetMapping("list-chuc-vu")
    public List<ChucVu> viewAll() {

        return chucvuService.getAll();
    }

    @PostMapping("add")
    public ChucVu add(@Valid @RequestBody ChucVu chucVu,
                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return chucvuService.add(chucVu);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<ChucVu> detail(@PathVariable("id") Integer id
    ) {
        return chucvuService.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!chucvuService.existsById(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            chucvuService.delete(id);
            return "";
        }
    }


    @PutMapping("update/{id}")
    public ChucVu update(@PathVariable("id") Integer id, @RequestBody ChucVu chucVu, BindingResult bindingResult) {
        chucVu.setIdCv(id);
        if (bindingResult.hasErrors()) {
            return null;
        } else {

            return chucvuService.update(chucVu);
        }
    }
}
