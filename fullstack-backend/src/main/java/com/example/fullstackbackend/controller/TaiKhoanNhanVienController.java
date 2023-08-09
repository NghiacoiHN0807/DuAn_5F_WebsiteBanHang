package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.TaiKhoanNhanVien;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.TaiKhoanNhanVienService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import java.util.Optional;

@RestController
@RequestMapping("/tai-khoan/")
@CrossOrigin("http://localhost:3000/")
public class TaiKhoanNhanVienController {
    @Autowired
    private TaiKhoanNhanVienService taiKhoanNhanVienService;

    @GetMapping("view-all")
    public Page<TaiKhoanNhanVien> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                             @RequestParam(defaultValue = "15") Integer size,
                                             @RequestParam("p") Optional<Integer> p) {

        return taiKhoanNhanVienService.phanTrang(p.orElse(page), size);
    }

    @GetMapping("view-alls")
    public Page<TaiKhoanNhanVien> viewAlll(@RequestParam(defaultValue = "0", value= "page") Integer page,
                                          @RequestParam(defaultValue = "15") Integer size,
                                           @RequestParam("trangThai") Integer trangThai) {

        return taiKhoanNhanVienService.phanTrang(page, size, trangThai);
    }

    @PostMapping("add")
    public TaiKhoanNhanVien add(@Valid @RequestBody TaiKhoanNhanVien taiKhoanNhanVien,
                        BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return taiKhoanNhanVienService.add(taiKhoanNhanVien);
        }
    }

    @GetMapping("detail/{id}")
    public Optional<TaiKhoanNhanVien> detail(@PathVariable("id") Integer id
    ) {

        return taiKhoanNhanVienService.detail(id);
    }

    @DeleteMapping("delete/{id}")
    ResponseEntity<ReponObject> delete(@PathVariable("id") Integer id){
        Boolean exist = taiKhoanNhanVienService.existsById(id);
        if (!exist) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ReponObject("Not found!", "Not could found entity by id:" + id, "")
            );
        }
        taiKhoanNhanVienService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ReponObject("Ok!", "Delete success " + id, "")
        );
    }


    @PutMapping("update/{id}")
    public TaiKhoanNhanVien update(@PathVariable("id") Integer id,@RequestBody TaiKhoanNhanVien taiKhoanNhanVien, BindingResult bindingResult) {
//        taiKhoanNhanVien.setIdTaiKhoan(id);
        if (bindingResult.hasErrors()) {
            return null;
        } else {

            return taiKhoanNhanVienService.update(taiKhoanNhanVien);
        }
    }
}