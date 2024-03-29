package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.XuatXu;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.XuatxuService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/xuat-xu/")
//@CrossOrigin("http://localhost:3000/")
public class XuatxuController {
    @Autowired
    private XuatxuService xuatxuSevice;

    @GetMapping("view-all")
    public Page<XuatXu> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                @RequestParam(defaultValue = "5") Integer size,
                                @RequestParam("p") Optional<Integer> p) {
        return xuatxuSevice.xuatXuPage(p.orElse(page), size);
    }

    @GetMapping("listXX")
    public List<XuatXu> listXX() {
        return xuatxuSevice.getAll();
    }

    @PostMapping("add")
    public ResponseEntity<?> add(@Valid @RequestBody XuatXu xuatXu,
                                    BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errorMap);
        } else {
            return ResponseEntity.ok(xuatxuSevice.add(xuatXu));
        }
    }

    @GetMapping("detail/{id}")
    public Optional<XuatXu> detail(@PathVariable("id") Integer id) {
        return xuatxuSevice.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!xuatxuSevice.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            xuatxuSevice.delete(id);
            return "";
        }
    }

    @PutMapping("update" )
    public ResponseEntity<?> update(@Valid @RequestBody XuatXu xuatXu,
                                    BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errorMap);
        } else {
            return ResponseEntity.ok(xuatxuSevice.update(xuatXu));
        }
    }
}

