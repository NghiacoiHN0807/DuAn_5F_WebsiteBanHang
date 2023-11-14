package com.example.fullstackbackend.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import java.security.SecureRandom;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "tai_khoan")
public class TaiKhoan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tai_khoan")
    private Integer idTaiKhoan;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_chuc_vu", referencedColumnName = "id_cv")
    private ChucVu idChucVu;

    @Column(name = "ma_tai_khoan")
    private String maTaiKhoan;

    @NotEmpty(message = "Không Được Để Trống Họ")
    @Column(name = "ho")
    private String ho;


    @NotEmpty(message = "Không Được Để Trống Tên")
    @Column(name = "ten")
    private String ten;

    @Pattern(message = "Nhập số Điện Thoại Chưa Đúng", regexp = "^(0|\\+84)(\\s|\\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\\d)(\\s|\\.)?(\\d{3})(\\s|\\.)?(\\d{3})$")
    @NotEmpty(message = "Không Được Để Trống Số Điện Thoại")
    @Size(min = 10, max = 10, message = "Số Điện Thoại Tối Thiểu 10 Số")
    @Column(name = "sdt")
    private String sdt;

    @NotEmpty(message = "Không Được Để Trống Email")
    @Email(message = "Email Chưa Đúng Định Dạng")
    @Column(name = "email")
    private String email;

    @Column(name = "mat_khau")
    private String matKhau;

    @Column(name = "so_can_cuoc")
    private String soCanCuoc;

    @Column(name = "trang_thai")
    private Integer trangThai;

    public TaiKhoan(String username, String password, List<GrantedAuthority> authorities) {
    }

    @PrePersist
    public void prePersist() {
        // Tạo mã tài khoản ngẫu nhiên không trùng nhau
        if (maTaiKhoan == null) {
            maTaiKhoan = generateMaTaiKhoan();
        }

        // Tạo mật khẩu ngẫu nhiên nếu trường matKhau là null hoặc trống
        if (matKhau == null) {
            matKhau = generateRandomPassword();
        }
    }

    public static String generateRandomPassword() {
        String upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lower = "abcdefghijklmnopqrstuvwxyz";
        String digits = "0123456789";
        String specialChars = "@";

        SecureRandom random = new SecureRandom();
        StringBuilder password = new StringBuilder();
        int length = 8;  // Độ dài mật khẩu mong muốn

        // Chọn ít nhất 1 ký tự đặc biệt và 1 số
        password.append(specialChars.charAt(random.nextInt(specialChars.length())));
        password.append(digits.charAt(random.nextInt(digits.length())));

        // Độ dài còn lại để hoàn thành mật khẩu
        int remainingLength = length - 2;

        String allCharacters = upper + lower + digits + specialChars;

        for (int i = 0; i < remainingLength; i++) {
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
        return "TK" + uuidString.toUpperCase().substring(0, 9);
    }
}

