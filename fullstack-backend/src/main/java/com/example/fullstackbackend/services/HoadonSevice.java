package com.example.fullstackbackend.services;

import com.example.fullstackbackend.DTO.HoaDonDTO;
import com.example.fullstackbackend.entity.HoaDon;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Modifying;

import java.util.List;
import java.util.Optional;

public interface HoadonSevice {
    List<HoaDon> getAll();

    Page<HoaDon> hoaDonPage(Integer pageNo, Integer size);

    List<HoaDon> hoaDonOffline();

    List<HoaDon> selectAllInvoiceWaiting();

    List<HoaDon> hoaDonOnline();

    HoaDon add(HoaDon add);

    void delete(Integer id);

    Boolean checkExists(Integer id);

    HoaDon update(HoaDon update);

    Optional<HoaDon> detail(Integer id);

    HoaDon finByMaHD(Integer maHD);

    HoaDon updatePaymentOnline(Integer idHd, HoaDon hoaDonDTO);
}
