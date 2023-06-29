package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.entity.ChatLieu;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.LoaiSp;
import com.example.fullstackbackend.entity.MauSac;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.entity.Size;
import com.example.fullstackbackend.entity.XuatXu;
import com.example.fullstackbackend.services.ChatlieuSevice;
import com.example.fullstackbackend.services.ChitietsanphamSevice;
import com.example.fullstackbackend.services.LoaispSevice;
import com.example.fullstackbackend.services.MausacSevice;
import com.example.fullstackbackend.services.SanPhamSevice;
import com.example.fullstackbackend.services.SizeSevice;
import com.example.fullstackbackend.services.XuatxuSevice;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/chi-tiet-san-pham/")
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

    @GetMapping("view-all")
    public String viewAll(@RequestParam(defaultValue = "0") Integer page,
                          @RequestParam(defaultValue = "5") Integer size,
                          @RequestParam("p") Optional<Integer> p,
                          Model model) {
        ChiTietSanPham chatlieu = new ChiTietSanPham();
        model.addAttribute("add", chatlieu);

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

        Page<ChiTietSanPham> xuatxus = chitietsanphamSevice.chatlieuPage(p.orElse(page), size);
        model.addAttribute("xuatxus", xuatxus);
        return "ChiTietSanPham";
    }

    @PostMapping("add")
    public String add(@Valid @ModelAttribute("add") ChiTietSanPham xuatxu,
                      BindingResult bindingResult, Model model,
                      @RequestParam(defaultValue = "0") Integer page,
                      @RequestParam(defaultValue = "5") Integer size,
                      @RequestParam("p") Optional<Integer> p) {
        if (bindingResult.hasErrors()) {
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

            Page<ChiTietSanPham> xuatxus = chitietsanphamSevice.chatlieuPage(p.orElse(page), size);
            model.addAttribute("xuatxus", xuatxus);
            return "ChiTietSanPham";
        } else {
            chitietsanphamSevice.add(xuatxu);
            return "redirect:/chi-tiet-san-pham/view-all";
        }
    }

    @GetMapping("detail/{id}")
    public String detail(@PathVariable("id") Integer id, @RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "5") Integer size, @RequestParam("p") Optional<Integer> p, Model model) {

        ChiTietSanPham xuatxu = new ChiTietSanPham();
        model.addAttribute("add", xuatxu);

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

        Page<ChiTietSanPham> chatlieus1 = chitietsanphamSevice.chatlieuPage(p.orElse(page), size);
        model.addAttribute("xuatxus", chatlieus1);

        return "ChiTietSanPham";
    }

    @GetMapping("delete/{id}")
    public String delete(@PathVariable("id") Integer id, Model model) {
        chitietsanphamSevice.delete(id);
        return "redirect:/chi-tiet-san-pham/view-all";
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
