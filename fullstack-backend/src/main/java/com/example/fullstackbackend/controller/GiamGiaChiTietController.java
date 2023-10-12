package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import com.example.fullstackbackend.services.GiamGiaChiTietService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

import java.time.LocalDate;
import java.util.Optional;

@RestController
@RequestMapping("/giam-gia-chi-tiet/api/")
@CrossOrigin("http://localhost:3000/")
public class GiamGiaChiTietController {

    @Autowired
    private GiamGiaChiTietService giamGiaChiTietService;

    @GetMapping("view-all")
    Page<GiamGiaChiTiet> getAll(@RequestParam(value = "page", defaultValue = "0") Integer pageNo,
                                @RequestParam(value = "size", defaultValue = "5") Integer size) {
        return giamGiaChiTietService.getAll(pageNo, size);
    }

    @GetMapping("search")
    Page<GiamGiaChiTiet> search(@RequestParam(value = "page", defaultValue = "0") Integer pageNo,
                                @RequestParam(value = "size", defaultValue = "5") Integer size,
                                @RequestParam("value") String value) {
        return giamGiaChiTietService.search(pageNo, size, value);
    }

    @GetMapping("filter-date")
    Page<GiamGiaChiTiet> filterDate(@RequestParam(value = "page", defaultValue = "0") Integer pageNo,
                                    @RequestParam(value = "size", defaultValue = "5") Integer size,
                                    @RequestParam("first") LocalDate first,
                                    @RequestParam("last") LocalDate last) {
        return giamGiaChiTietService.getAllByDate(pageNo, size, first, last);
    }

    @GetMapping("views")
    Page<GiamGiaChiTiet> getAll(@RequestParam(value = "page", defaultValue = "0") Integer pageNo, @RequestParam(value = "size", defaultValue = "5") Integer size, @RequestParam(value = "trangThai", defaultValue = "0") Integer trangThai) {
        return giamGiaChiTietService.getAllByTrangThai(pageNo, size, trangThai);
    }

    @GetMapping("detail/{id}")
    ResponseEntity<ReponObject> getOne(@PathVariable("id") Integer id) {
        Optional<GiamGiaChiTiet> giamGiaChiTiet = giamGiaChiTietService.getOne(id);
        if (!giamGiaChiTiet.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ReponObject("Not found!", "Not could found entity by id:" + id, "")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ReponObject("Ok!", "Found success " + id, giamGiaChiTiet)
        );
    }

    @DeleteMapping("remove/{id}")
    ResponseEntity<ReponObject> remove(@PathVariable("id") Integer id) {
        Boolean exits = giamGiaChiTietService.existsById(id);
        if (!exits) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ReponObject("Not found!", "Not could found entity by id:" + id, "")
            );
        }
        giamGiaChiTietService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ReponObject("Ok!", "Delete success " + id, "")
        );
    }

    @PostMapping("insert")
<<<<<<< HEAD
    ResponseEntity<ReponObject> add(@RequestBody GiamGiaChiTiet giamGiaChiTiet) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ReponObject("Ok!", "Add success!", giamGiaChiTietService.add(giamGiaChiTiet))
        );
=======
    GiamGiaChiTiet add(@RequestBody GiamGiaChiTiet giamGiaChiTiet) {
        return giamGiaChiTietService.add(giamGiaChiTiet);
>>>>>>> main
    }

    @PutMapping("update/{id}")
    ResponseEntity<ReponObject> update(@RequestBody GiamGiaChiTiet giamGiaChiTiet, @PathVariable("id") Integer id) {
        Optional<GiamGiaChiTiet> giamGiaChiTiet1 = giamGiaChiTietService.getOne(id);
        if (giamGiaChiTiet1.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
<<<<<<< HEAD
                    new ReponObject("Ok!", "Update success id: " + id, giamGiaChiTietService.update(giamGiaChiTiet))
=======
                    new ReponObject("Ok!", "Update success id: " + id, giamGiaChiTietService.update(giamGiaChiTiet, id))
>>>>>>> main
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ReponObject("Failed!", "Not found id: " + id, "")
        );
    }
<<<<<<< HEAD
=======

    @GetMapping("getidGiamGiaByIdggct/{id}")
    Integer findByIdGiamGia_IdGiamGia(@PathVariable("id") Integer id) {
        return giamGiaChiTietService.findByIdGiamGia_IdGiamGia(id);
    }
>>>>>>> main
}
