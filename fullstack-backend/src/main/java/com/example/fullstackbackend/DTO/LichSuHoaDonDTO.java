package com.example.fullstackbackend.DTO;

import com.example.fullstackbackend.entity.HoaDon;
import com.example.fullstackbackend.entity.TaiKhoan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LichSuHoaDonDTO {
    private Integer idLshd;
    private HoaDon idHd;
    private TaiKhoan idTk;
    private Integer trangThai;
    private String moTa;
    private java.sql.Timestamp ngayThayDoi;

}
