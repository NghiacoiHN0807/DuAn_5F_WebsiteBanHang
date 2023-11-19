package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.Images;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.ImagesSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/images/")
@CrossOrigin("http://localhost:3000/")
public class ImagesController {
    @Autowired
    private ImagesSevice imagesSevice;

    @GetMapping("view-all")
    public Page<Images> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                @RequestParam(defaultValue = "5") Integer size,
                                @RequestParam("p") Optional<Integer> p) {
        Page<Images> img = imagesSevice.imagesPage(p.orElse(page), size);
        return img;
    }

    @GetMapping("select-byidSP")
    List<Images> findByIdCtsp_IdSp(@RequestParam("id") Integer idSp) {
        return imagesSevice.findByIdCtsp_IdSp(idSp);
    }


    @PostMapping("add")
    public Images add(@Valid @RequestBody Images newImg,
                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return imagesSevice.add(newImg);
        }
    }

    @GetMapping("detail-image/{idSp}")
    public List<Images> findImagesByIdSp(@PathVariable("idSp") Integer idSp) {

        return imagesSevice.findImagesByIdSp(idSp);
    }

    @GetMapping("detail/{id}")
    public String detail(@PathVariable("id") Integer id) {
        return "XuatXu";
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!imagesSevice.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            imagesSevice.delete(id);
            return "";
        }
    }

    @GetMapping("view-update/{id}")
    public String viewUpdate(@PathVariable("id") Integer id, Model model) {

        return "Update-XuatXu";
    }

    @PostMapping("update")
    public Images update(@RequestBody Images xuatxu) {
        return imagesSevice.update(xuatxu);
    }
}
