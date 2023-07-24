package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.OngTayAo;
import com.example.fullstackbackend.services.OngTayAoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/ong-tay-ao/")
public class OngTayAoController {
    @Autowired
    private OngTayAoService ongTayAoService;

    @GetMapping("detail/{id}")
    public Optional<OngTayAo> detail(@PathVariable("id") Integer id) {
        return ongTayAoService.detail(id);
    }
}
