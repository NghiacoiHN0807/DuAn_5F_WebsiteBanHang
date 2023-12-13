package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.DTO.SanPhamClientDTO;
import com.example.fullstackbackend.DTO.SanPhamCustom;
import com.example.fullstackbackend.DTO.SanPhamDTO;
import com.example.fullstackbackend.DTO.SanPhamIgDTO;
import com.example.fullstackbackend.DTO.SanPhamWithMinImageDTO;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.services.SanPhamService;
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

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3000/")
@RequestMapping("/san-pham/")
public class SanPhamController {
    @Autowired
    private SanPhamService sanPhamService;

    @GetMapping("view-all")
    public Page<SanPham> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                 @RequestParam(defaultValue = "15") Integer size,
                                 @RequestParam("p") Optional<Integer> p) {
        return sanPhamService.sanPhamPage(p.orElse(page), size);
    }

    @GetMapping("listSP")
    public List<SanPham> listSP() {
        return sanPhamService.getAll();
    }

    @GetMapping("minimage")
    public ResponseEntity<List<SanPhamWithMinImageDTO>> getSanPhamWithMinImage() {
        List<Object[]> result = sanPhamService.getSanPhamWithMinImageUrl();

        List<SanPhamWithMinImageDTO> dtoList = new ArrayList<>();
        for (Object[] row : result) {
            SanPhamIgDTO sp = new SanPhamIgDTO();
            sp.setIdSp((Integer) row[0]);
            sp.setMaSp((String) row[1]);
            sp.setTenSp((String) row[2]);
            sp.setIdCl((Integer) row[3]);
            sp.setIdLsp((Integer) row[4]);
            sp.setIdXx((Integer) row[5]);
            sp.setIdTayAo((Integer) row[6]);
            sp.setIdCoAo((Integer) row[7]);
            sp.setMoTa((String) row[8]);
            sp.setTrangThai((Integer) row[9]);
            String imageUrl = (String) row[10];
            sp.setGiaSmall((BigDecimal) row[11]);
            sp.setGiaBig((BigDecimal) row[12]);
            dtoList.add(new SanPhamWithMinImageDTO(sp, imageUrl));
        }

        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("/minimage/{idSp}")
    public SanPhamWithMinImageDTO getSanPhamWithMinImageUrlByIdSp(@PathVariable Integer idSp) {
        return sanPhamService.getSanPhamWithMinImageUrlByIdSp(idSp);
    }

    @GetMapping("dto")
    public ResponseEntity<List<SanPhamDTO>> getSanPhamDetails() {
        List<SanPhamDTO> page = sanPhamService.getSanPhamDetails();
        return ResponseEntity.ok(page);
    }

    @PostMapping("add")
    public ResponseEntity<?> add(@Valid @RequestBody SanPham sanPham,
                                 BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errorMap);
        } else {
            return ResponseEntity.ok(sanPhamService.add(sanPham));
        }
    }

    @GetMapping("detail/{id}")
    public Optional<SanPham> detail(@PathVariable("id") Integer id) {
        return sanPhamService.detail(id);
    }

    @DeleteMapping("delete/{id}")
    public SanPham delete(@PathVariable("id") Integer id) {
        return sanPhamService.delete(id);
    }

    @PutMapping("update")
    public ResponseEntity<?> update(@Valid @RequestBody SanPham sanPham,
                                    BindingResult bindingResult) {

        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errorMap);
        } else {
            return ResponseEntity.ok(sanPhamService.update(sanPham));
        }
    }

    @GetMapping("getSpForAdmin")
    public ResponseEntity<List<SanPhamCustom>> getSanPhamDetail() {
        List<SanPhamCustom> pageSp = sanPhamService.sanPhamCustom();
        return ResponseEntity.ok(pageSp);
    }

    @GetMapping("getSpForClient")
    public ResponseEntity<Page<SanPhamClientDTO>> getSpForClient(@RequestParam(defaultValue = "0") Integer page,
                                                                 @RequestParam(defaultValue = "12") Integer size,
                                                                 @RequestParam("p") Optional<Integer> p) {
        Page<SanPhamClientDTO> pageSp = sanPhamService.sanPhamForClient(p.orElse(page), size);
        return ResponseEntity.ok(pageSp);
    }

    @GetMapping("getSpGiamGiaForClient")
    public ResponseEntity<List<SanPhamClientDTO>> getSpGiamGiaForClient() {
        List<SanPhamClientDTO> pageSp = sanPhamService.getSpGiamGiaForClient();
        return ResponseEntity.ok(pageSp);
    }

    @GetMapping("getTopSpBanChayForClient")
    public ResponseEntity<List<SanPhamClientDTO>> getTopSpBanChayForClient() {
        List<SanPhamClientDTO> pageSp = sanPhamService.getTopSpBanChayForClient();
        return ResponseEntity.ok(pageSp);
    }

    @GetMapping("/top-sp-trend")
    public List<Object[]> getTopSpTrend() {
        return sanPhamService.topSptrend();
    }

    @GetMapping("sp-lien-quan/{idLsp}/{idSp}")
    public ResponseEntity<List<SanPhamClientDTO>> relatedProduct(@PathVariable("idLsp") Integer idLsp,
                                                                 @PathVariable("idSp") Integer idSp) {
        List<SanPhamClientDTO> pageSp = sanPhamService.relatedProduct(idLsp, idSp);
        return ResponseEntity.ok(pageSp);
    }

}
