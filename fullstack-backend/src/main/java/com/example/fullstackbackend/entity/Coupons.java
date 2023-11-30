package com.example.fullstackbackend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "coupons")
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Coupons {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer idCoupon;

    @Column(name = "name")
    @NotBlank(message = "Vui lòng nhập tên chương trình!")
    private String tenChuongTrinh;

    @Column(name = "code")
    @NotBlank(message = "Vui lòng nhập mã code!")
    private String code;

    @Column(name = "mo_ta")
    private String moTa;

    @Column(name = "thoi_gian_ket_thuc")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @NotNull(message = "Vui lòng nhập thời gian kết thúc!")
    private Date thoiGianKetThuc;

    @Column(name = "so_luong")
    @NotNull(message = "Vui lòng nhập số lượng!")
    private Integer soLuong;

    @ManyToOne(fetch = FetchType.EAGER, optional = true)
    @JoinColumn(name = "hoa_don_id", referencedColumnName = "id_hd", nullable = true)
    private HoaDon hoaDon;

    @Column(name = "discount")
    private BigDecimal tienMat;

    @Column(name = "discount_percentage")
    @NotNull(message = "Vui lòng nhập phần trăm giảm!")
    private Integer phanTram;

    @Column(name = "max_discount")
    @NotNull(message = "Vui lòng nhập số tiền tối thiểu!")
    private BigDecimal tienToiThieu;

    @Column(name = "so_luong_hien_tai")
    private Integer soLuongHienTai;

    @Column(name = "thoi_gian_tao")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    @NotNull(message = "Vui lòng nhập số thời gian tạo!")
    private Date thoiGianTao;

    @Column(name = "thoi_gian_sua")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", timezone = "Asia/Ho_Chi_Minh")
    private Date thoiGianSua;

    @Column(name = "trang_thai")
    private Integer trangThai = 0;

    @PreUpdate
    private void preUpdate() {
        thoiGianSua = new Date();
    }


}
