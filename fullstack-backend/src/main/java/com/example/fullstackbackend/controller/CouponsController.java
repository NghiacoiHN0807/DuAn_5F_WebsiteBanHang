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
    ResponseEntity<?> add(@RequestBody Coupons coupons) {
        Optional<Coupons> coupons1 = couponsService.detailByCode(coupons.getCode());
        if(coupons1.isPresent()) {
            return ResponseEntity.badRequest().body("error");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    couponsService.add(coupons)
            );
        }
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

    @DeleteMapping("/delete/{id}/{trangThai}")
    ResponseEntity<?> delete(@PathVariable("id") Integer id, @PathVariable("trangThai") Integer trangThai) {
        Boolean exists = couponsService.existsById(id);
        if (!exists) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy id"
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                couponsService.delete(id, trangThai)
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

    @PostMapping("/insert-hd")
    ResponseEntity<?> insertHd(@RequestParam("idHd") Integer idHd, @RequestParam("code") String code) {
        Optional<HoaDon> hoaDon = hoadonSevice.detail(idHd);
        if (hoaDon.isPresent()) {
            if (hoaDon.get().getMaGiamGia() == null || hoaDon.get().getMaGiamGia().trim().isBlank()) {
                if (hoaDon.get().getThanhTien() == null) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                            "Không tìm thấy thành tiền!"
                    );
                } else {
                    Optional<Coupons> coupons = couponsService.detailByCode(code);
                    if (coupons.isPresent()) {
                        if (coupons.get().getSoLuongHienTai() == null) {
                            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                                    "Mã giảm giá đã hết lượt sử dụng!"
                            );
                        } else if (coupons.get().getSoLuongHienTai() < 1) {
                            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                                    "Mã giảm giá đã hết lượt sử dụng!"
                            );
                        } else {
                            if (coupons.get().getTrangThai() == 10) {
                                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                                        "Mã giảm giá không tồn tại hoặc hết hạn!"
                                );
                            } else {
                                Integer check = hoaDon.get().getThanhTien().compareTo(coupons.get().getTienToiThieu());
                                if (check == -1) {
                                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                                            "Số tiền tối thiểu không đủ!"
                                    );
                                } else {
                                    return ResponseEntity.status(HttpStatus.OK).body(
                                            couponsService.addCoupons(idHd, code)
                                    );
                                }
                            }
                        }
                    } else {
                        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                                "Mã giảm giá không tồn tại hoặc hết hạn!"
                        );
                    }
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

    @PostMapping("/remove-coupon/{idHd}")
    ResponseEntity<?> removeCoupon(@PathVariable("idHd") Integer idHd) {
        Optional<HoaDon> hoaDon = hoadonSevice.detail(idHd);
        if(hoaDon.isPresent()) {
            if(hoaDon.get().getMaGiamGia() != null) {
                Boolean remove = couponsService.removeCoupons(idHd);
                if(remove) {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            "Xóa thành công!"
                    );
                } else {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            "Xóa thất bại!"
                    );
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        "Có lỗi xảy ra!"
                );
            }
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy hóa đơn!"
            );
        }
    }

    @DeleteMapping("/remove-all")
    ResponseEntity<?> removeAll(@RequestBody List<Integer> ids) {
        if(ids.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    "Không tìm thấy id!"
            );
        } else {
            Boolean remove = couponsService.removeAll(ids);
            if(remove) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        "Delete success!"
                );
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                        "Delete failed!"
                );
            }
        }
    }

}
