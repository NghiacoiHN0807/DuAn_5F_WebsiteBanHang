package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.Coupons;
import com.example.fullstackbackend.services.CouponsService;
import lombok.RequiredArgsConstructor;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/coupons/api")
@RequiredArgsConstructor
public class CouponsController {

    private final CouponsService couponsService;

    @GetMapping("/get-all")
    ResponseEntity<?> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(
                couponsService.getAll()
        );
    }

    @PostMapping("/add")
    ResponseEntity<?> add(@RequestBody Coupons coupons) {
        return ResponseEntity.status(HttpStatus.OK).body(
                couponsService.add(coupons)
        );
    }

    @PutMapping("/update/{id}")
    ResponseEntity<?> update(@PathVariable("id") Integer id, @RequestBody Coupons coupons) {
        Boolean exists = couponsService.existsById(id);
        if (!exists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy id"
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                couponsService.update(coupons, id)
        );
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<?> delete(@PathVariable("id") Integer id) {
        Boolean exists = couponsService.existsById(id);
        if (!exists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy id"
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                couponsService.delete(id)
        );
    }

    @GetMapping("/detail/{id}")
    ResponseEntity<?> detail(@PathVariable("id") Integer id) {
        Boolean exists = couponsService.existsById(id);
        if (!exists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy id"
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                couponsService.detail(id)
        );
    }

}
