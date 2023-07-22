package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChucVu;
import com.example.fullstackbackend.entity.GiamGia;
import com.example.fullstackbackend.services.ChucvuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chuc-vu/")
@CrossOrigin("http://localhost:3000/")
public class ChucVuController {
    @Autowired
    private ChucvuService chucvuService;

    @GetMapping("view-all")
    Page<ChucVu> viewAll(@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer size,
                         @RequestParam("p") Optional<Integer> p) {
        return chucvuService.phanTrang(page, size);
    }

    @PostMapping("add")
    ResponseEntity<ResponObj> getAll(@RequestBody ChucVu chucVu) {
        List<ChucVu> chucVus = chucvuService.getByMa(chucVu.getMaCv().trim());
        if (chucVus.size() > 0) {
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ResponObj("Failed!", "khong tim thay ma!", "")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ResponObj("Ok!", "Success!", chucvuService.add(chucVu))
        );
    }

    @GetMapping("detail/{id}")
    public String detail(@PathVariable("id") Integer id, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer size, @RequestParam("p") Optional<Integer> p, Model model) {

        ChucVu chucVu = new ChucVu();
        model.addAttribute("add", chucVu);

        Optional<ChucVu> chucVu1 = chucvuService.detail(id);
        model.addAttribute("getOne", chucVu1.get());

        Page<ChucVu> phanTrang = chucvuService.phanTrang(p.orElse(page), size);
        model.addAttribute("xuatxus", phanTrang);

        return "ChucVu";
    }

    @GetMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id, Model model) {
        chucvuService.delete(id);
        return "redirect:/chuc-vu/view-all";
    }

    @GetMapping("view-update/{id}")
    public String viewUpdate(@PathVariable("id") Integer id, Model model) {

        ChucVu chucVu = new ChucVu();
        model.addAttribute("update", chucVu);

        Optional<ChucVu> chucVu1 = chucvuService.detail(id);
        model.addAttribute("getOne", chucVu1.get());

        return "Update-ChucVu";
    }

    @PostMapping("update")
    public String update(@ModelAttribute("update") ChucVu chucVu) {
        chucvuService.update(chucVu);
        return "redirect:/chuc-vu/view-all";
    }
}
