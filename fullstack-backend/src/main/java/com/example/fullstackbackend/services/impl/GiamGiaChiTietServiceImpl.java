package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.DTO.GiamGiaDTO;
import com.example.fullstackbackend.entity.GiamGia;
import com.example.fullstackbackend.entity.GiamGiaChiTiet;
import com.example.fullstackbackend.entity.SanPham;
import com.example.fullstackbackend.repository.GiamGiaChiTietRepository;
import com.example.fullstackbackend.repository.SanphamRepository;
import com.example.fullstackbackend.services.GiamGiaChiTietService;
import com.example.fullstackbackend.services.GiamGiaService;
import com.example.fullstackbackend.services.SanPhamService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class GiamGiaChiTietServiceImpl implements GiamGiaChiTietService {

    @Autowired
    private GiamGiaChiTietRepository giamGiaChiTietRepository;

    @Autowired
    private SanphamRepository sanphamRepository;

    @Autowired
    private GiamGiaService giamGiaService;

    @Autowired
    private SanPhamService sanPhamService;

    @Override
    public List<GiamGiaChiTiet> getAll() {
        return giamGiaChiTietRepository.findAll();
    }

    @Override
    public List<GiamGiaChiTiet> getAllByTrangThai(Integer trangThai) {
        return giamGiaChiTietRepository.findAllByTrangThai(trangThai);
    }

    @Override
    public List<GiamGiaChiTiet> getAllByDate(LocalDate ngayBatDau, LocalDate ngayKetThuc) {
        return giamGiaChiTietRepository.findAllByDate(ngayBatDau, ngayKetThuc);
    }

    @Override
    public Optional<GiamGiaChiTiet> getOne(Integer id) {
        return giamGiaChiTietRepository.findById(id);
    }

    @Override
    public GiamGiaChiTiet add(GiamGiaChiTiet giamGiaChiTiet) {
        return giamGiaChiTietRepository.save(giamGiaChiTiet);
    }

    @Override
    public Object update(GiamGiaChiTiet giamGiaChiTiet, Integer id) {
        giamGiaChiTiet.setIdGgct(id);
        return giamGiaChiTietRepository.save(giamGiaChiTiet);
    }

    @Override
    public Boolean existsById(Integer id) {
        return giamGiaChiTietRepository.existsById(id);
    }

    @Override
    @Transactional
    public void remove(Integer id) {
        boolean tatCaLaTrangThai0 = true;
        GiamGiaChiTiet giamGiaChiTiet = getOne(id).orElseThrow();
        GiamGia giamGia = giamGiaService.getOne(giamGiaChiTiet.getIdGiamGia().getIdGiamGia()).orElseThrow();
        giamGiaChiTiet.setTrangThai(10);
        Integer idSp = giamGiaChiTiet.getIdSp().getIdSp();
        SanPham sanPham = sanPhamService.detail(idSp).orElseThrow();
        sanPham.setTrangThai(0);
        sanPhamService.add(sanPham);
        giamGiaChiTietRepository.updateCtsp("amount", BigDecimal.valueOf(0.0), idSp);
        giamGiaChiTietRepository.save(giamGiaChiTiet);
        List<GiamGiaChiTiet> giamGiaChiTiets = giamGiaChiTietRepository.findAllByIdGiamGia_IdGiamGia(giamGia.getIdGiamGia());
        for (GiamGiaChiTiet x : giamGiaChiTiets) {
            if (x.getTrangThai() != 10) {
                tatCaLaTrangThai0 = false;
                break; // Có ít nhất một phần tử không có trạng thái 10, dừng kiểm tra
            }
        }
        // Kiểm tra nếu tất cả đều có trạng thái 10
        if (tatCaLaTrangThai0) {
            giamGia.setTrangThai(10);
            giamGiaService.add(giamGia);
            // Thực hiện câu lệnh khi tất cả đều có trạng thái 10
            // Ví dụ: System.out.println("Tất cả có trạng thái 10");
        }
        giamGiaChiTietRepository.deleteById(id);
    }

    @Override
    @Transactional
    public void updateGiaThuc(Integer id) {
        BigDecimal gia = mucGiam(id);
        String type = typeGiam(id);
        giamGiaChiTietRepository.updateCtsp(String.valueOf(type), gia, id);
    }

    @Override
    public String typeGiam(Integer idSp) {
        List<Object[]> result = giamGiaChiTietRepository.mucGiam(idSp);

        if (!result.isEmpty()) {
            for (Object[] row : result) {
                BigDecimal mucGiamPhanTram = (BigDecimal) row[0];
                BigDecimal mucGiamTienMat = (BigDecimal) row[1];

                if (mucGiamPhanTram != null) {
                    return "percentage";
                }
                return "amount";
            }
        }

        return null;
    }

    @Override
    public BigDecimal mucGiam(Integer idSp) {
        List<Object[]> result = giamGiaChiTietRepository.mucGiam(idSp);

        if (!result.isEmpty()) {
            for (Object[] row : result) {
                BigDecimal mucGiamPhanTram = (BigDecimal) row[0];
                BigDecimal mucGiamTienMat = (BigDecimal) row[1];

                if (mucGiamPhanTram != null) {
                    return mucGiamPhanTram;
                }
                return mucGiamTienMat;
            }
        }

        return BigDecimal.ZERO; // Or handle the case where the result is unexpected.
    }

    @Override
    @Transactional
    public GiamGiaDTO insert(GiamGiaDTO giamGiaDTO) {
        Date ngayHienTai = new Date();
        System.out.println("ngayHienTai" + ngayHienTai);
        if (giamGiaDTO.getGiamGia().getNgayBatDau().after(ngayHienTai)) {
            GiamGia giamGia1 = (GiamGia) giamGiaService.add(giamGiaDTO.getGiamGia());
            List<Integer> idSp = giamGiaDTO.getIdSp();
            for (Integer i : idSp) {
                System.out.println("id if: " + i);
                GiamGiaChiTiet giamGiaChiTiet2 = new GiamGiaChiTiet();
                SanPham sanPham = sanPhamService.detail(i).orElseThrow();
                giamGiaChiTiet2.setIdGiamGia(giamGia1);
                giamGiaChiTiet2.setIdSp(sanPham);
                giamGiaChiTiet2.setTrangThai(1);
                giamGiaChiTietRepository.save(giamGiaChiTiet2);
            }
        }
        return giamGiaDTO;
    }

    @Override
    @Transactional
    public GiamGiaDTO updateDto(GiamGiaDTO giamGiaDTO, Integer id) {
        List<GiamGiaChiTiet> giamGiaChiTietsc = giamGiaChiTietRepository.findAllByIdGiamGia_IdGiamGia(id);
        for (GiamGiaChiTiet g : giamGiaChiTietsc) {
            remove(g.getIdGgct());
            giamGiaChiTietRepository.deleteById(g.getIdGgct());
        }
        Date ngayHienTai = new Date();
        System.out.println("ngayHienTai" + ngayHienTai);
        if (giamGiaDTO.getGiamGia().getNgayBatDau().after(ngayHienTai)) {
            giamGiaDTO.getGiamGia().setIdGiamGia(id);
            GiamGia giamGia1 = (GiamGia) giamGiaService.add(giamGiaDTO.getGiamGia());
            List<Integer> idSp = giamGiaDTO.getIdSp();
            for (Integer i : idSp) {
                System.out.println("id if: " + i);
                GiamGiaChiTiet giamGiaChiTiet2 = new GiamGiaChiTiet();
                SanPham sanPham = sanPhamService.detail(i).orElseThrow();
                giamGiaChiTiet2.setIdGiamGia(giamGia1);
                giamGiaChiTiet2.setIdSp(sanPham);
                giamGiaChiTiet2.setTrangThai(1);
                giamGiaChiTietRepository.save(giamGiaChiTiet2);
            }
        }
        return giamGiaDTO;
    }

    @Transactional
    @Override
    public Boolean removeAll(List<Integer> ids) {
        try {
            for (Integer id : ids) {
                GiamGiaChiTiet giamGiaChiTiet = getOne(id).orElseThrow();
                giamGiaChiTiet.setTrangThai(10);

                Integer idGiamGia = giamGiaChiTiet.getIdGiamGia().getIdGiamGia();
                List<GiamGiaChiTiet> giamGiaChiTiets = giamGiaChiTietRepository.findAllByIdGiamGia_IdGiamGia(idGiamGia);
                boolean tatCaLaTrangThai10 = giamGiaChiTiets.stream().allMatch(x -> x.getTrangThai() == 10);

                if (tatCaLaTrangThai10) {
                    GiamGia giamGia = giamGiaService.getOne(idGiamGia).orElseThrow();
                    giamGia.setTrangThai(10);
                    giamGiaService.add(giamGia);
                    // Thực hiện câu lệnh khi tất cả đều có trạng thái 10
                    // Ví dụ: System.out.println("Tất cả có trạng thái 10");
                }

                // Update sản phẩm và chi tiết giảm giá trong một giao dịch
                updateSanPhamAndGiamGiaChiTiet(giamGiaChiTiet);
                giamGiaChiTietRepository.deleteById(giamGiaChiTiet.getIdGgct());
            }

            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<GiamGiaChiTiet> findByIdGiamGia(Integer idGg) {
        return giamGiaChiTietRepository.findByIdGiamGia(idGg);
    }

    private void updateSanPhamAndGiamGiaChiTiet(GiamGiaChiTiet giamGiaChiTiets) {
        Integer idSp = giamGiaChiTiets.getIdSp().getIdSp();
        SanPham sanPham = sanPhamService.detail(idSp).orElseThrow();
        sanPham.setTrangThai(0);
        sanPhamService.add(sanPham);

        giamGiaChiTietRepository.updateCtsp("amount", BigDecimal.valueOf(0.0), idSp);
        giamGiaChiTietRepository.save(giamGiaChiTiets);
    }

}