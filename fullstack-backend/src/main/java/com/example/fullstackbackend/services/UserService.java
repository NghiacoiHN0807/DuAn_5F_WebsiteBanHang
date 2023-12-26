package com.example.fullstackbackend.services;


import com.example.fullstackbackend.security.CustomUserDetails;
import com.example.fullstackbackend.security.user.TaiKhoanUser;
import com.example.fullstackbackend.security.user.UserRepository;
import com.example.fullstackbackend.entity.ChucVu;
import com.example.fullstackbackend.entity.TaiKhoan;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public UserDetails loadUserByUsername(String username) {
        // Check taiKhoan

        TaiKhoanUser taiKhoan = userRepository.findByEmail(username);
        System.out.println("taiKhoan: " + taiKhoan);
        if (username == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(taiKhoan);
    }

    @Value("${spring.mail.username}")
    private String formMail;

    public void sendEmail(String mail, String pass) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(formMail);
        message.setTo(mail);
        message.setSubject("Mật khẩu Mới");
        String content = "Đăng nhập 5F Store" ;
        content += "\nTên đăng nhập : " + mail;
        content += "\nMật khẩu hiện tại để đăng nhập : " + pass;
        content += "\nTrân trọng.";
        message.setText(content);

        mailSender.send(message);
    }


    public TaiKhoanUser forgetPassword(String mail){

            Optional<TaiKhoanUser> tk = findByEmail(mail);
            String pass = TaiKhoan.generateRandomPassword();
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String PassEncode = encoder.encode(pass);
            sendEmail(mail, pass);
            tk.get().setMatKhau(PassEncode);
            return userRepository.save(tk.get());

    }

    public TaiKhoanUser add(TaiKhoanUser add) {
        ChucVu vc = new ChucVu(9,"CV03","Khách Hàng", Date.valueOf("2023-07-23"),0);
        add.setIdChucVu(vc);
        add.setSdt(null);
        String pass = TaiKhoan.generateRandomPassword();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String PassEncode = encoder.encode(pass);
        sendEmail(add.getEmail(), pass);
        add.setMatKhau(PassEncode);
        return userRepository.save(add);
    }

    public Optional<TaiKhoanUser> findByEmail(String email){
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    public Boolean checkMailExists(String email) {
        return userRepository.existsByEmailAllIgnoreCase(email);
    }
    public Boolean checkBan(String email) {
        return userRepository.checkBan(email);
    }

}
