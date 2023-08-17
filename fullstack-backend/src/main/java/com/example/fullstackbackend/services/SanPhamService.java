package com.example.fullstackbackend.services;

import com.example.fullstackbackend.DTO.SanPhamDTO;
import com.example.fullstackbackend.DTO.SanPhamCustom;
import com.example.fullstackbackend.entity.SanPham;
import org.springframework.data.domain.Page;
import java.util.List;
import java.util.Optional;

public interface SanPhamService {

    List<SanPham> getAll();

    Page<SanPham> sanPhamPage(Integer pageNo, Integer size);

    Page<SanPhamCustom> sanPhamCustom(Integer pageNo, Integer size);

    SanPham add(SanPham add);

    SanPham delete(Integer id);

    SanPham update(SanPham update);

    Optional<SanPham> detail(Integer id);

    Boolean checkExists(Integer id);

    List<Object[]> getSanPhamWithMinImageUrl();

    Page<SanPhamDTO> getSanPhamDetails(Integer pageNo, Integer size);
}
