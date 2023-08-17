package com.example.fullstackbackend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "lich_su_hoa_don")
public class LichSuHoaDon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_lshd")
    private Integer idLshd;

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "id_hd", referencedColumnName = "id_hd")
    private HoaDon idHd;

    @ManyToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "id_tk", referencedColumnName = "id_tai_khoan")
    private TaiKhoan idTk;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "ngay_thay_doi")
    private java.sql.Timestamp ngayThayDoi;
}
