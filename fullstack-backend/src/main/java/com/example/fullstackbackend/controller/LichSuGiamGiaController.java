package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.LichSuGiamGia;
import com.example.fullstackbackend.services.LichSuGiamGiaService;
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

import java.util.Optional;

@RestController
@RequestMapping("/lich-su-giam-gia/api/")
@CrossOrigin("http://localhost:3000/")
public class LichSuGiamGiaController {

    @Autowired
    private LichSuGiamGiaService lichSuGiamGiaService;

    @GetMapping("views")
    Page<LichSuGiamGia> getAll(@RequestParam(value = "page", defaultValue = "0") Integer pageNo, @RequestParam(value = "size", defaultValue = "5") Integer size) {
        return lichSuGiamGiaService.getAll(pageNo, size);
    }

    @GetMapping("detail/{id}")
    ResponseEntity<ReponObject> getOne(@PathVariable("id") Integer id) {
        Optional<LichSuGiamGia> lichSuGiamGia = lichSuGiamGiaService.getOne(id);
        if (!lichSuGiamGia.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ReponObject("Failed!", "Not found id: " + id, "")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ReponObject("Ok!", "Found success id: " + id, lichSuGiamGia)
        );
    }

    @DeleteMapping("remove/{id}")
    ResponseEntity<ReponObject> remove(@PathVariable("id") Integer id) {
        Boolean exist = lichSuGiamGiaService.existsById(id);
        if (!exist) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ReponObject("Failed!", "Not found id: " + id, "")
            );
        }
        lichSuGiamGiaService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ReponObject("Ok!", "Delete success id: " + id, "")
        );
    }

    @PostMapping("insert")
    ResponseEntity<ReponObject> add(@RequestBody LichSuGiamGia lichSuGiamGia) {
        return ResponseEntity.status(HttpStatus.OK).body(
                new ReponObject("Ok!", "Add success!", lichSuGiamGiaService.add(lichSuGiamGia))
        );
    }

    @PutMapping("upadte/{id}")
    ResponseEntity<ReponObject> update(@RequestBody LichSuGiamGia lichSuGiamGia, @PathVariable("id") Integer id) {
        Optional<LichSuGiamGia> lichSuGiamGia1 = lichSuGiamGiaService.getOne(id);
        if(lichSuGiamGia1.isEmpty()) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ReponObject("Ok!", "Update success id: "+ id, lichSuGiamGiaService.update(lichSuGiamGia))
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                new ReponObject("Failed!", "Not found id: " + id, "")
        );
    }

}
