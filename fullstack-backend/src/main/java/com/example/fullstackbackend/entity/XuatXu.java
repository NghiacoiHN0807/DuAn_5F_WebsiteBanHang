package com.example.fullstackbackend.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "xuat_xu")
public class XuatXu {
    @Id
    @Column(name = "id_xx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idXx;

    @Column(name = "ma_xx")
    private String maXx;

    @NotBlank(message = "Tên xuất xứ không được để trống")
    @Column(name = "ten_nuoc")
    private String tenNuoc;

    @NotNull(message = "Trang thái không được để trống")
    @Column(name = "trang_thai")
    private Integer trangThai;

    @PrePersist
    public void prePersist() {
        // Tạo mã tài khoản ngẫu nhiên không trùng nhau
        if (maXx == null) {
            maXx = generateMaSP();
        }
    }
    private String generateMaSP() {
        // Tạo một UUID mới
        UUID uuid = UUID.randomUUID();

        // Chuyển UUID thành chuỗi và loại bỏ các ký tự '-'
        String uuidString = uuid.toString().replace("-", "");

        // Lấy 6 ký tự đầu của chuỗi UUID
        return "XX" + uuidString.toUpperCase().substring(0, 9);
    }

}