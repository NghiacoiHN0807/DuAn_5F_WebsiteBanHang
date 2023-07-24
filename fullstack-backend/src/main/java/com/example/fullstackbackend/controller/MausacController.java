package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.MauSac;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.MausacService;
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
@RequestMapping("/mau-sac/")
public class MausacController {
    @Autowired
    private MausacService mausacService;

    @GetMapping("view-all")
    public Page<MauSac> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                  @RequestParam(defaultValue = "5") Integer size,
                                  @RequestParam("p") Optional<Integer> p) {
        return mausacService.mauSacPage(p.orElse(page), size);
    }

    @GetMapping("listMS")
    public List<MauSac> listMS() {
        return mausacService.getAll();
    }

    @PostMapping("add")
    public MauSac add(@Valid @RequestBody MauSac mauSac,
                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return mausacService.add(mauSac);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<MauSac> detail(@PathVariable("id") Integer id) {
        return mausacService.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!mausacService.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            mausacService.delete(id);
            return "";
        }
    }

    @PutMapping("update")
    public MauSac update(@RequestBody MauSac mauSac) {
        return mausacService.update(mauSac);
    }
}
