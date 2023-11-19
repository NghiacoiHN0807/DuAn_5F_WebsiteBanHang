package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.ChiTietSanPham;
import com.example.fullstackbackend.entity.GioHang;
import com.example.fullstackbackend.entity.GioHangChiTiet;
import com.example.fullstackbackend.repository.ChitietsanphamRepository;
import com.example.fullstackbackend.repository.GioHangChiTietReponsitory;
import com.example.fullstackbackend.repository.GioHangReponsitory;
import com.example.fullstackbackend.repository.HoadonRepository;
import com.example.fullstackbackend.repository.HoadonchitietRepository;
import com.example.fullstackbackend.services.GioHangChiTietSevice;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GioHangChiTietServiceImpl implements GioHangChiTietSevice {

    private final GioHangChiTietReponsitory gioHangChiTietReponsitory;

    private final ChitietsanphamRepository chitietsanphamRepository;

    private final GioHangReponsitory gioHangReponsitory;

    private final HoadonchitietRepository hoadonchitietRepository;

    private final HoadonRepository hoadonRepository;

    @Override
    public List<GioHangChiTiet> getAll(Integer idKh) {
        return gioHangChiTietReponsitory.findByIdGh_IdKh_IdTaiKhoan(idKh);
    }

    @Override
    public void addGHCT(Integer idKH, GioHangChiTiet gioHangChiTiet) {

        Optional<GioHang> detailGH = gioHangReponsitory.findByIdKh_IdTaiKhoan(idKH);

        Optional<ChiTietSanPham> getCTSP = chitietsanphamRepository.findById(gioHangChiTiet.getIdCtsp().getIdCtsp());

        GioHangChiTiet gioHangChiTiet1 = new GioHangChiTiet();

        if (detailGH.isPresent()) {
            Optional<GioHangChiTiet> checkExist = gioHangChiTietReponsitory.findByIdCtsp_IdCtsp(gioHangChiTiet.getIdCtsp().getIdCtsp());
            System.out.println("checkExist: " + checkExist);
            if (checkExist.isPresent()) {
                GioHangChiTiet gioHangChiTietOptional = gioHangChiTietReponsitory.findByIdCtsp_IdCtsp(getCTSP.get().getIdCtsp()).orElseThrow();
                gioHangChiTietOptional.setIdGh(detailGH.get());
                gioHangChiTietOptional.setIdCtsp(gioHangChiTiet.getIdCtsp());
                // Set quantity
                int updateSL = gioHangChiTiet.getSoLuong() + checkExist.get().getSoLuong();
                gioHangChiTietOptional.setSoLuong(updateSL);
                // Set Don Gia
                BigDecimal donGia = getCTSP.get().getGiaThucTe().multiply(new BigDecimal(updateSL));
                gioHangChiTietOptional.setDonGia(donGia);
                gioHangChiTietOptional.setDonGiaSauGiam(donGia);
                gioHangChiTietOptional.setTrangThai(0);
                gioHangChiTietReponsitory.save(gioHangChiTietOptional);
            } else {
                gioHangChiTiet1.setIdGh(detailGH.get());
                gioHangChiTiet1.setIdCtsp(gioHangChiTiet.getIdCtsp());
                gioHangChiTiet1.setSoLuong(gioHangChiTiet.getSoLuong());
                BigDecimal donGia = getCTSP.get().getGiaThucTe().multiply(new BigDecimal(gioHangChiTiet.getSoLuong()));
                gioHangChiTiet1.setDonGia(donGia);
                gioHangChiTiet1.setDonGiaSauGiam(donGia);
                gioHangChiTiet1.setTrangThai(0);
                gioHangChiTietReponsitory.save(gioHangChiTiet1);
            }
        }
    }

    @Override
    public void updateGHCT(Integer id, GioHangChiTiet gioHangChiTiet) {
        Optional<GioHangChiTiet> detailGHCT = gioHangChiTietReponsitory.findByIdCtsp_IdCtsp(id);
        if (detailGHCT.isPresent()) {
            GioHangChiTiet detailGHCT1 = gioHangChiTietReponsitory.findByIdCtsp_IdCtsp(id).orElseThrow();
            // Set quantity and price
            detailGHCT1.setSoLuong(gioHangChiTiet.getSoLuong());
            BigDecimal price = detailGHCT.get().getIdCtsp().getGiaThucTe().multiply(new BigDecimal(gioHangChiTiet.getSoLuong()));
            detailGHCT1.setDonGia(price);
            detailGHCT1.setDonGiaSauGiam(price);
            // Update
            gioHangChiTietReponsitory.save(detailGHCT1);

        }
    }

    @Override
    public void deleteGHCT(Integer idGHCT) {
        gioHangChiTietReponsitory.deleteById(idGHCT);
    }

    @Override
    public void transferHDCT(Integer idHd, ChiTietSanPham chiTietSanPham) {
        // Create New Bill

        // Add product on detail invoice
//        hoadonchitietRepository.save()
    }
}