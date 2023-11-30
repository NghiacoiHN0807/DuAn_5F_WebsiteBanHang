package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.Coupons;
import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.services.CouponsService;
import com.example.fullstackbackend.services.HoadonSevice;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/coupons/api")
@RequiredArgsConstructor
public class CouponsController {

    private final CouponsService couponsService;

    private final HoadonSevice hoadonSevice;

    @GetMapping("/get-all")
    ResponseEntity<?> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(
                couponsService.getAll()
        );
    }

    @PostMapping("/add")
    ResponseEntity<?> add(@Valid @RequestBody Coupons coupons, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errorMap);
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    couponsService.add(coupons)
            );
        }
    }

    @PutMapping("/update/{id}")
    ResponseEntity<?> update(@PathVariable("id") Integer id, @Valid @RequestBody Coupons coupons, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errorMap);
        } else {
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

    @PostMapping("/coupon/insert-hd")
    ResponseEntity<?> insertHd(@RequestParam("idHd") Integer idHd, @RequestParam("code") String code) {
        Optional<HoaDon> hoaDon = hoadonSevice.detail(idHd);
        if (hoaDon.isPresent()) {
            if (hoaDon.get().getMaGiamGia() == null) {
                Optional<Coupons> coupons = couponsService.detailByCode(code);
                if (coupons.isPresent()) {
                    if (coupons.get().getSoLuongHienTai() < 1) {
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                                "Mã giảm giá đã hết lượt sử dụng!"
                        );
                    } else {
                        return ResponseEntity.status(HttpStatus.OK).body(
                                couponsService.addCoupons(idHd, code)
                        );
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                            "Mã giảm giá không tồn tại hoặc hết hạn!"
                    );
                }
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                        "Không thể thêm mã giảm giá!"
                );
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy hóa đơn!"
            );
        }
    }

}
