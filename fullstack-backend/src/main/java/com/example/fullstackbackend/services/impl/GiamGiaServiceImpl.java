package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.DTO.GiamGiaChiTietDTO;
import com.example.fullstackbackend.DTO.GiamGiaWithChiTietDTO;
import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.GiamGia;
import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.repository.ChitietsanphamRepository;
import com.example.fullstackbackend.repository.GiamGiaChiTietRepository;
import com.example.fullstackbackend.repository.GiamGiaRepository;
import com.example.fullstackbackend.services.GiamGiaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class GiamGiaServiceImpl implements GiamGiaService {

    @Autowired
    private GiamGiaRepository giamGiaRepository;

    @Autowired
    private GiamGiaChiTietRepository giamGiaChiTietRepository;

    @Autowired
    private ChitietsanphamRepository chiTietSanPhamRepository;

    @Override
    public Page<GiamGia> getAll(Integer pageNo, Integer size, Integer trangThai) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return giamGiaRepository.findAllByTrangThai(trangThai, pageable);
    }

    @Override
    public List<GiamGia> getByMa(String ma) {
        return giamGiaRepository.findByMaGiamGia(ma);
    }

    @Override
    public Optional<GiamGia> getOne(Integer id) {
        return giamGiaRepository.findById(id);
    }

    @Override
    public Object add(GiamGia giamGia) {
        return giamGiaRepository.save(giamGia);
    }

    @Override
    public Object update(GiamGia giamGia) {
        return giamGiaRepository.save(giamGia);
    }

    @Override
    public Boolean existsById(Integer id) {
        return giamGiaRepository.existsById(id);
    }

    @Override
    public void remove(Integer id) {
        GiamGia giamGia = getOne(id).orElseThrow();
        giamGia.setTrangThai(10);
        giamGiaRepository.save(giamGia);
    }
//
//    @Override
//    public void addGiamGiaWithChiTiet(GiamGiaWithChiTietDTO request) {
//        GiamGia giamGia = request.getGiamGia();
//        List<GiamGiaChiTietDTO> chiTietList = request.getChiTietList();
//
//        GiamGia savedGiamGia = giamGiaRepository.save(giamGia);
//
//        System.out.println("Ha: "+ chiTietList.get(0).getSanPham().getIdSp());
//        for (GiamGiaChiTietDTO chiTietDTO : chiTietList) {
//            SanPham sanPham = chiTietDTO.getSanPham();
//
//            System.out.println("sanPham" + sanPham);
//
//            // Sử dụng danh sách các id sản phẩm để tìm các chi tiết sản phẩm tương ứng
////            List<ChiTietSanPham> chiTietSanPhamList = chiTietSanPhamRepository.findByProductId(sanPham.getIdSp());
//            System.out.println("cc: "+ chiTietSanPhamList.get(0).getIdSp());
//            for (ChiTietSanPham chiTietSanPham : chiTietSanPhamList) {
//                System.out.println("Id ctsp: " + chiTietSanPham.getIdCtsp());
//                GiamGiaChiTiet chiTiet = new GiamGiaChiTiet();
//
//                chiTiet.setIdGiamGia(savedGiamGia);
//                chiTiet.setIdCtsp(chiTietSanPham);
//                chiTiet.setDonGia(chiTietSanPham.getIdSp().getGiaBan());
//                chiTiet.setTrangThai(0);
//
//                if (giamGia.getMucGiamPhanTram() != null) {
//                    BigDecimal giamPhanTram = giamGia.getMucGiamPhanTram().divide(BigDecimal.valueOf(100));
//                    BigDecimal soTienConLai = chiTietSanPham.getIdSp().getGiaBan().multiply(BigDecimal.ONE.subtract(giamPhanTram));
//                    chiTiet.setSoTienConLai(soTienConLai);
//                } else if (giamGia.getMucGiamTienMat() != null) {
//                    BigDecimal soTienConLai = chiTietSanPham.getIdSp().getGiaBan().subtract(giamGia.getMucGiamTienMat());
//                    chiTiet.setSoTienConLai(soTienConLai);
//                }
//
//                giamGiaChiTietRepository.save(chiTiet);
//            }
//        }
//    }


}
