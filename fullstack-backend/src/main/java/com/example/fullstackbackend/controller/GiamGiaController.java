package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.GiamGia;
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

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/giam-gia/api/")
@CrossOrigin("http://localhost:3000/")
public class GiamGiaController {

    @Autowired
    private GiamGiaService giamGiaService;

    @GetMapping("view")
    Page<GiamGia> view(@RequestParam(value = "page", defaultValue = "0") Integer pageNo, @RequestParam(value = "size", defaultValue = "5") Integer size, @RequestParam(value = "trangThai", defaultValue = "0") Integer trangThai) {
        return giamGiaService.getAll(pageNo, size, trangThai);
    }

    @GetMapping("detail/{id}")
    ResponseEntity<ReponObject> getone(@PathVariable("id") Integer id) {
        Optional<GiamGia> giamGia = giamGiaService.getOne(id);
        if (!giamGia.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ReponObject("Not found!", "Not could found entity by id:" + id, "")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ReponObject("Ok!", "Found success " + id, giamGia)
        );
    }

    @DeleteMapping("remove/{id}")
    ResponseEntity<ReponObject> remove(@PathVariable("id") Integer id) {
        Boolean exist = giamGiaService.existsById(id);
        if (!exist) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    new ReponObject("Not found!", "Not could found entity by id:" + id, "")
            );
        }
        giamGiaService.remove(id);
        return ResponseEntity.status(HttpStatus.OK).body(
                new ReponObject("Ok!", "Delete success " + id, "")
        );
    }

        @PostMapping("insert")
    ResponseEntity<ReponObject> insert(@RequestBody GiamGia giamGia) {
        List<GiamGia> giamGias = giamGiaService.getByMa(giamGia.getMaGiamGia().trim());
        if (giamGias.size() > 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ReponObject("Failed!", "Ma already taken!", "")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ReponObject("Ok!", "Insert success!", giamGiaService.add(giamGia))
        );
    }

    @PutMapping("update/{id}")
    ResponseEntity<ReponObject> update(@RequestBody GiamGia giamGia, @PathVariable("id") Integer id) {
        Optional<GiamGia> giamGia1 = giamGiaService.getOne(id);
        if (giamGia1.isPresent()) {
            giamGia.setIdGiamGia(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ReponObject("Ok!", "Update success!", giamGiaService.update(giamGia))
            );
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                new ReponObject("Failed!", "Not found id!", "")
        );
    }

//    @PostMapping("addGiamGiaWithChiTiet")
//    public ResponseEntity<String> addGiamGiaWithChiTiet(@RequestBody GiamGiaWithChiTietDTO request) {
//        try {
//            giamGiaService.addGiamGiaWithChiTiet(request);
//            return ResponseEntity.status(HttpStatus.CREATED).body("Thêm giảm giá và chi tiết thành công");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi thêm giảm giá và chi tiết");
//        }
//    }

}
