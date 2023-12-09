package com.example.fullstackbackend.security.user;

import com.example.fullstackbackend.entity.ChucVu;
import jakarta.persistence.*;
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
public class TaiKhoanUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tai_khoan")
    private Integer idTaiKhoan;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_chuc_vu", referencedColumnName = "id_cv")
    private ChucVu idChucVu;

    @Column(name = "ma_tai_khoan")
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

    @Column(name = "so_can_cuoc")
    private String soCanCuoc;

    @Column(name = "trang_thai")
    private Integer trangThai = 0;

    public TaiKhoanUser(String username, String password, List<GrantedAuthority> authorities) {
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

