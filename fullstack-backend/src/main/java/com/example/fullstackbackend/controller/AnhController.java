package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.Anh;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.services.AnhService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/anh/")
public class AnhController {

    @Autowired
    private AnhService anhService;

    @GetMapping("listAnh/{idSp}")
    public List<Anh> listSP(@PathVariable("idSp") Integer idSp) {
        return anhService.getAnhById(idSp);
    }

    @PostMapping("add")
    public Anh add(@Valid @RequestBody Anh a,
                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return anhService.add(a);
        }
    }

    @DeleteMapping("delete/{id}")
    public Anh delete(@PathVariable("id") Integer id) {
        return anhService.delete(id);
    }

}
