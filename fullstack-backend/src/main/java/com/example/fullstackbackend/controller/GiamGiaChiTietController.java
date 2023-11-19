package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.DTO.GiamGiaDTO;
import com.example.fullstackbackend.entity.GiamGia;
import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import com.example.fullstackbackend.services.GiamGiaChiTietService;
import com.example.fullstackbackend.services.GiamGiaService;
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
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/giam-gia-chi-tiet/api/")
@CrossOrigin("http://localhost:3000/")
public class GiamGiaChiTietController {

    @Autowired
    private GiamGiaChiTietService giamGiaChiTietService;

    @Autowired
    private GiamGiaService giamGiaService;

    @GetMapping("view-all")
    List<GiamGiaChiTiet> getAll() {
        return giamGiaChiTietService.getAll();
    }

    @GetMapping("filter-date")
    List<GiamGiaChiTiet> filterDate(@RequestParam("first") LocalDate first,
                                    @RequestParam("last") LocalDate last) {
        return giamGiaChiTietService.getAllByDate(first, last);
    }

    @GetMapping("views")
    List<GiamGiaChiTiet> getAll(@RequestParam(value = "page", defaultValue = "0") Integer pageNo, @RequestParam(value = "size", defaultValue = "5") Integer size, @RequestParam(value = "trangThai", defaultValue = "0") Integer trangThai) {
        return giamGiaChiTietService.getAllByTrangThai(trangThai);
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
    GiamGiaChiTiet add(@RequestBody GiamGiaChiTiet giamGiaChiTiet) {
        return giamGiaChiTietService.add(giamGiaChiTiet);
    }

    @PutMapping("update/{id}")
    ResponseEntity<ReponObject> update(@RequestBody GiamGiaChiTiet giamGiaChiTiet, @PathVariable("id") Integer id) {
        Optional<GiamGiaChiTiet> giamGiaChiTiet1 = giamGiaChiTietService.getOne(id);
        if (giamGiaChiTiet1.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ReponObject("Ok!", "Update success id: " + id, giamGiaChiTietService.update(giamGiaChiTiet, id))
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ReponObject("Failed!", "Not found id: " + id, "")
        );
    }

    @PostMapping("insert-dto")
    ResponseEntity<?> insertDto(@RequestBody GiamGiaDTO giamGiaDTO) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ReponObject("Ok!", "Add success id: ", giamGiaChiTietService.insert(giamGiaDTO))
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ReponObject("Failed!", "Not found id: ", "")
            );
        }
    }

    @PutMapping("update-dto/{id}")
    ResponseEntity<?> updateDto(@RequestBody GiamGiaDTO giamGiaDTO, @PathVariable("id") Integer id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ReponObject("Ok!", "Add success id: ", giamGiaChiTietService.updateDto(giamGiaDTO, id))
            );
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ReponObject("Failed!", "Not found id: ", "")
            );
        }
    }

    @GetMapping("test/{id}")
    ResponseEntity<?> testApi(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(giamGiaChiTietService.mucGiam(id));
    }
}