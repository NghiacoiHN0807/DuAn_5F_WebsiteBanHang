package com.example.fullstackbackend.services;

import com.example.fullstackbackend.entity.HoaDon;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface HoadonSevice {
    List<HoaDon> getAll();

    Page<HoaDon> hoaDonPage(Integer pageNo, Integer size);

    List<HoaDon> hoaDonOffline();

    List<HoaDon> selectAllInvoiceWaiting();

    List<HoaDon> hoaDonOnline();

    List<HoaDon> findAllByIDKH(Integer idKH);

    HoaDon add(HoaDon add);

    void delete(Integer id);

    void deleteHDOver(Integer idHd);

    Boolean checkExists(Integer id);

    HoaDon update(HoaDon update);

//    HoaDon updatePaymentClient(Integer idHd, HoaDon update);

    Optional<HoaDon> detail(Integer id);

    HoaDon finByMaHD(Integer maHD);

    HoaDon updatePaymentOnline(Integer idHd, HoaDon hoaDonDTO);

    Double calculateTotalTongTien();

    Long totalInvoice();

    List<Object[]> getTotalRevenueByDay();

    Double getTyLeTraHang();

    Long tongSpDaban();

}
