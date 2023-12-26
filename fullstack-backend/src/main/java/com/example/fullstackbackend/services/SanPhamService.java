package com.example.fullstackbackend.services;

import com.example.fullstackbackend.DTO.SanPhamClientDTO;
import com.example.fullstackbackend.DTO.SanPhamDTO;
import com.example.fullstackbackend.DTO.SanPhamCustom;
import com.example.fullstackbackend.DTO.SanPhamDTO;
import com.example.fullstackbackend.DTO.SanPhamWithMinImageDTO;
import com.example.fullstackbackend.entity.SanPham;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface SanPhamService {


    Page<SanPham> getAll(Integer pageNo, Integer limit, Integer tinhTrang);

    List<SanPham> getAll();

    Page<SanPham> sanPhamPage(Integer pageNo, Integer size);

    List<SanPhamCustom> sanPhamCustom();

    List<SanPhamClientDTO> sanPhamForClient();

    SanPham add(SanPham add);

    SanPham delete(Integer id);

    SanPham update(SanPham update);

    Optional<SanPham> detail(Integer id);

    Boolean checkExists(Integer id);

    List<Object[]> getSanPhamWithMinImageUrl();

    List<SanPhamWithMinImageDTO> getSanPhamWithMinImageUrlByIdGg(Integer idGg);

    Page<SanPhamDTO> getSanPhamDetails(Integer pageNo, Integer size);

    List<Object[]> topSptrend();

    List<SanPhamDTO> getSanPhamDetails();

    List<SanPhamClientDTO> getSpGiamGiaForClient();

    List<SanPhamClientDTO> getTopSpBanChayForClient();

    List<SanPhamClientDTO> relatedProduct(Integer idLsp, Integer idSp);

    void setSpIsOut();

}
