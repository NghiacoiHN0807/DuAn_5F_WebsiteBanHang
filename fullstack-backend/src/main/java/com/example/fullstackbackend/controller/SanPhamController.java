package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.DTO.SanPhamDTO;
import com.example.fullstackbackend.DTO.SanPhamWithMinImageDTO;
import com.example.fullstackbackend.DTO.SanPhamCustom;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.services.SanPhamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import java.util.ArrayList;
import java.util.List;
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
            SanPham sp = (SanPham) row[0];
            String imageUrl = (String) row[1];
            dtoList.add(new SanPhamWithMinImageDTO(sp, imageUrl));
        }

        return ResponseEntity.ok(dtoList);
    }

    @GetMapping("dto")
    public ResponseEntity<Page<SanPhamDTO>> getSanPhamDetails(@RequestParam(value = "page", defaultValue = "0") Integer pageNo,
                                                         @RequestParam(value = "size", defaultValue = "5") Integer size) {
        Page<SanPhamDTO> page = sanPhamService.getSanPhamDetails(pageNo, size);
        return ResponseEntity.ok(page);
    }

    @PostMapping("add")
    public SanPham add(@Valid @RequestBody SanPham sanPham,
                       BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return sanPhamService.add(sanPham);
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
    public SanPham update(@RequestBody SanPham sanPham) {
        return sanPhamService.update(sanPham);
    }

    @GetMapping("getSpWithImg")
    public ResponseEntity<Page<SanPhamCustom>> getSanPhamDetails(@RequestParam(defaultValue = "0") Integer page,
                                                                 @RequestParam(defaultValue = "15") Integer size,
                                                                 @RequestParam("p") Optional<Integer> p) {
        Page<SanPhamCustom> pageSp = sanPhamService.sanPhamCustom(p.orElse(page), size);
        return ResponseEntity.ok(pageSp);
    }
}
