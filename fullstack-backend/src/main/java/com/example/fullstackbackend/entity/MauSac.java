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
@Table(name = "mau_sac")
public class MauSac {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ms")
    private Integer idMs;

    @Column(name = "ma_ms")
    private String maMs;

    @NotBlank(message = "Tên màu sắc không được để trống")
    @Column(name = "ten_ms")
    private String tenMs;

    @NotNull(message = "Trạng thái không được để trống")
    @Column(name = "trang_thai")
    private Integer trangThai;

    @PrePersist
    public void prePersist() {
        // Tạo mã tài khoản ngẫu nhiên không trùng nhau
        if (maMs == null) {
            maMs = generateMaSP();
        }
    }
    private String generateMaSP() {
        // Tạo một UUID mới
        UUID uuid = UUID.randomUUID();

        // Chuyển UUID thành chuỗi và loại bỏ các ký tự '-'
        String uuidString = uuid.toString().replace("-", "");

        // Lấy 6 ký tự đầu của chuỗi UUID
        return "MS" + uuidString.toUpperCase().substring(0, 9);
    }

}
