package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.services.ChitietsanphamService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chi-tiet-san-pham/")
@CrossOrigin("http://localhost:3000/")

public class ChitietsanphamController {
    @Autowired
    private ChitietsanphamService chitietsanphamSevice;

    @GetMapping("view-all")
    public Page<ChiTietSanPham> viewAll(@RequestParam(defaultValue = "0") Integer page,
                                        @RequestParam(defaultValue = "5") Integer size,
                                        @RequestParam("p") Optional<Integer> p) {
        Page<ChiTietSanPham> chiTietSP = chitietsanphamSevice.chiTietSP(p.orElse(page), size);
        return chiTietSP;
    }

    @GetMapping("view-all-ctsp")
    public Page<Object[]> getSanPhamsWithSizes(@RequestParam(defaultValue = "0") Integer page,
                                                     @RequestParam(defaultValue = "15") Integer size,
                                                     @RequestParam("p") Optional<Integer> p) {
        Page<Object[]> chiTietSP = chitietsanphamSevice.getSanPhamsWithSizes(p.orElse(page), size);
        return chiTietSP;
    }

    @GetMapping("select-ctsp-byId/{id}")
    public List<ChiTietSanPham> getCtspById (@PathVariable("id") Integer id) {
        return chitietsanphamSevice.findByIdSp(id);
    }

    @GetMapping("detail/{id}")
    public ChiTietSanPham detail(@PathVariable("id") Integer id) {
        return chitietsanphamSevice.detail(id).orElse(null);
    }

    @GetMapping("select-Classify/{name}")
    public List<ChiTietSanPham> findByProductName(@PathVariable("name") String name) {
        List<ChiTietSanPham> chiTietSanPham = chitietsanphamSevice.findByProductName(name);
        return chiTietSanPham;
    }


    @GetMapping("get-one-ctsp/{name}/{size}/{ms}")
    public Optional<ChiTietSanPham> findByProductNameAndSize(@PathVariable("name") String name,
                                                             @PathVariable("size") String size,
                                                             @PathVariable("ms") String ms) {
        Optional<ChiTietSanPham> chiTietSanPham = chitietsanphamSevice.findByProductNameAndSize(name, size, ms);
        return chiTietSanPham;
    }


    @GetMapping("select-ctsp-byid/{id}")
    public List<ChiTietSanPham> findByProductId(@PathVariable("id") Integer id) {
        List<ChiTietSanPham> chiTietSanPham = chitietsanphamSevice.findByProductId(id);
        return chiTietSanPham;
    }

    @PostMapping("add/{soLuong}")
    public ChiTietSanPham add(@Valid @RequestBody ChiTietSanPham chiTietSanPham,
                              BindingResult bindingResult,
                              @PathVariable("soLuong") Integer soLuong) {
        if (bindingResult.hasErrors()) {
            return null;
        } else {
            return chitietsanphamSevice.addAndUpdateSize(chiTietSanPham, soLuong);
        }
    }

    @PutMapping("delete/{id}")
    public ChiTietSanPham delete(@PathVariable("id") Integer id) {
        return chitietsanphamSevice.delete(id);
    }

    @PutMapping("update")
    public ChiTietSanPham update(@RequestBody ChiTietSanPham chiTietSanPham) {
        return chitietsanphamSevice.update(chiTietSanPham);
    }

    @PostMapping("addColorAndSize/{idSp}/{idMs}/{idSize}")
    public ChiTietSanPham addColorAndSize(@PathVariable("idSp") Integer idSp,
                                          @PathVariable("idMs") Integer idMs,
                                          @PathVariable("idSize") Integer idSize) {
        return chitietsanphamSevice.addColorAndSize(idSp, idMs, idSize);
    }

    @PutMapping("updateNumber/{idCtsp}/{giaNhap}/{giaBan}/{soLuongTon}/{trangThai}")
    public ChiTietSanPham updateNumber(@PathVariable("idCtsp") Integer idCtsp,
                                       @PathVariable("giaNhap") BigDecimal giaNhap,
                                       @PathVariable("giaBan") BigDecimal giaBan,
                                       @PathVariable("soLuongTon") Integer soLuongTon,
                                       @PathVariable("trangThai") Integer trangThai) {
        return chitietsanphamSevice.updateNumber(idCtsp,giaNhap, giaBan, soLuongTon, trangThai);
    }

}
