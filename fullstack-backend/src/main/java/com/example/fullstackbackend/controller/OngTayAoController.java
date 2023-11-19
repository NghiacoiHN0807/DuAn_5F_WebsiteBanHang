package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.OngTayAo;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.OngTayAoService;
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
@RequestMapping("/ong-tay-ao/")
public class OngTayAoController {
    @Autowired
    private OngTayAoService ongTayAoService;

    @GetMapping("view-all")
    public Page<OngTayAo> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                  @RequestParam(defaultValue = "5") Integer size,
                                  @RequestParam("p") Optional<Integer> p) {
        return ongTayAoService.ongTayAoPage(p.orElse(page), size);
    }

    @GetMapping("listTayAo")
    public List<OngTayAo> listTayAo() {
        return ongTayAoService.getAll();
    }

    @PostMapping("add")
    public OngTayAo add(@Valid @RequestBody OngTayAo ongTayAo,
                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return ongTayAoService.add(ongTayAo);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<OngTayAo> detail(@PathVariable("id") Integer id) {
        return ongTayAoService.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!ongTayAoService.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            ongTayAoService.delete(id);
            return "";
        }
    }

    @PutMapping("update")
    public OngTayAo update(@RequestBody OngTayAo ongTayAo) {
        return ongTayAoService.update(ongTayAo);
    }
}
