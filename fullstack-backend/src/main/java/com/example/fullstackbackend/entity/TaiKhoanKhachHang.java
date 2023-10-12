package com.example.fullstackbackend.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.security.SecureRandom;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tai_khoan")
public class TaiKhoanKhachHang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tai_khoan")
    private Integer idTaiKhoan;

    @Column(name = "ma_tai_khoan", unique = true)
    private String maTaiKhoan;

    @Column(name = "ho")
    private String ho;

    @Column(name = "ten")
    private String ten;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "email")
    private String email;

    @Column(name = "mat_khau")
    private String matKhau;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @PrePersist
    public void prePersist() {
        // Tạo mã tài khoản ngẫu nhiên không trùng nhau
        if (maTaiKhoan == null) {
            maTaiKhoan = generateMaTaiKhoan();
        }

        // Tạo mật khẩu ngẫu nhiên nếu trường matKhau là null
        if (matKhau == null) {
            matKhau = generateRandomPassword();
        }
    }

    private String generateRandomPassword() {
        String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lower = "abcdefghijklmnopqrstuvwxyz";
        String digits = "0123456789";
        String specialChars = "@";

        String allCharacters = upper + lower + digits + specialChars;

        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();
        Integer length = 12;
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(allCharacters.length());
            password.append(allCharacters.charAt(index));
        }

        return password.toString();
    }

    private String generateMaTaiKhoan() {
        // Tạo một UUID mới
        UUID uuid = UUID.randomUUID();

        // Chuyển UUID thành chuỗi và loại bỏ các ký tự '-'
        String uuidString = uuid.toString().replace("-", "");

        // Lấy 6 ký tự đầu của chuỗi UUID
        return "TK" + uuidString.substring(0, 9);
    }

}
