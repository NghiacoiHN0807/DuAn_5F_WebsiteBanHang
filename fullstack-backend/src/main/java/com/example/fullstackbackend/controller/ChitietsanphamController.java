package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChatLieu;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.LoaiCoAo;
import com.example.fullstackbackend.entity.LoaiSp;
import com.example.fullstackbackend.entity.MauSac;
import com.example.fullstackbackend.entity.OngTayAo;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.entity.Size;
import com.example.fullstackbackend.entity.XuatXu;
import com.example.fullstackbackend.exception.xuatXuNotFoundException;
import com.example.fullstackbackend.services.ChatlieuSevice;
import com.example.fullstackbackend.services.ChitietsanphamSevice;
import com.example.fullstackbackend.services.LoaiCoAoService;
import com.example.fullstackbackend.services.LoaispSevice;
import com.example.fullstackbackend.services.MausacSevice;
import com.example.fullstackbackend.services.OngTayAoService;
import com.example.fullstackbackend.services.SanPhamSevice;
import com.example.fullstackbackend.services.SizeSevice;
import com.example.fullstackbackend.services.XuatxuSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
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
@RequestMapping("/chi-tiet-san-pham/")
@CrossOrigin("http://localhost:3000/")

public class ChitietsanphamController {
    @Autowired
    private ChitietsanphamSevice chitietsanphamSevice;

    @Autowired
    private ChatlieuSevice chatlieuSevice;

    @Autowired
    private LoaispSevice loaispSevice;

    @Autowired
    private SanPhamSevice sanPhamSevice;

    @Autowired
    private SizeSevice sizeSevice;

    @Autowired
    private XuatxuSevice xuatxuSevice;

    @Autowired
    private MausacSevice mausacSevice;

    @Autowired
    private OngTayAoService ongTayAoService;

    @Autowired
    private LoaiCoAoService loaiCoAoService;

    @GetMapping("view-all")
    public Page<ChiTietSanPham> viewAll(@RequestParam(defaultValue = "0") Integer page,
                          @RequestParam(defaultValue = "5") Integer size,
                          @RequestParam("p") Optional<Integer> p) {
        Page<ChiTietSanPham> chiTietSP = chitietsanphamSevice.chiTietSP(p.orElse(page), size);
        return chiTietSP;
    }



    @GetMapping("view-all/listMS")
    public List<MauSac> listMS() {

        List<MauSac> listMS = mausacSevice.getAll();
        return listMS;
    }

    @GetMapping("view-all/listSize")
    public List<Size> listSize() {

        List<Size> listSize = sizeSevice.getAll();
        return listSize;
    }

    @GetMapping("view-all/listSP")
    public List<SanPham> listSP() {

        List<SanPham> listSP = sanPhamSevice.getAll();
        return listSP;
    }

    @GetMapping("view-all/listLSP")
    public List<LoaiSp> listLSP() {

        List<LoaiSp> listLSP = loaispSevice.getAll();
        return listLSP;
    }



    @GetMapping("view-all/listTayAo")
    public List<OngTayAo> listTayAo() {

        List<OngTayAo> listTayAo = ongTayAoService.getAll();
        return listTayAo;
    }

    @GetMapping("view-all/listCoAo")
    public List<LoaiCoAo> listCoAo() {

        List<LoaiCoAo> listCoAo = loaiCoAoService.getAll();
        return listCoAo;
    }

    @PostMapping("add")
    public ChiTietSanPham add(@Valid @RequestBody ChiTietSanPham ctsp,
                      BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return null;
        }else{
            return chitietsanphamSevice.add(ctsp);
        }

    }

//    @GetMapping("detail/{id}")
//    public ChiTietSanPham detail(@PathVariable("id") Integer id) {
//        return null;
//    }

    @DeleteMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id) {
        if (!chitietsanphamSevice.checkExists(id)) {
            throw new xuatXuNotFoundException(id);
        } else {
            chitietsanphamSevice.delete(id);
            return "";
        }
    }

    @GetMapping("view-update/{id}")
    public String viewUpdate(@PathVariable("id") Integer id, Model model) {

        ChiTietSanPham xuatxu = new ChiTietSanPham();
        model.addAttribute("update", xuatxu);
        List<ChatLieu> chatlieus = chatlieuSevice.getAll();
        model.addAttribute("chatlieus", chatlieus);

        List<LoaiSp> loaisps = loaispSevice.getAll();
        model.addAttribute("loaisps", loaisps);

        List<SanPham> sanphams = sanPhamSevice.getAll();
        model.addAttribute("sanphams", sanphams);

        List<Size> sizes = sizeSevice.getAll();
        model.addAttribute("sizes", sizes);

        List<XuatXu> xuatxus1 = xuatxuSevice.getAll();
        model.addAttribute("xuatxus1", xuatxus1);

        List<MauSac> mausacs = mausacSevice.getAll();
        model.addAttribute("mausacs", mausacs);

        Optional<ChiTietSanPham> xuatxu1 = chitietsanphamSevice.detail(id);
        model.addAttribute("getOne", xuatxu1.get());

        Optional<ChiTietSanPham> chatlieu = chitietsanphamSevice.detail(id);
        model.addAttribute("getOne", chatlieu.get());

        return "Update-ChiTietSanPham";
    }

    @PostMapping("update")
    public String update(@ModelAttribute("update") ChiTietSanPham xuatxu) {
        chitietsanphamSevice.update(xuatxu);
        return "redirect:/chi-tiet-san-pham/view-all";
    }
}
