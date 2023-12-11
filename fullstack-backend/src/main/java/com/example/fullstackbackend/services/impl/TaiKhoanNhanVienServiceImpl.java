package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.repository.TaiKhoanNhanVienRepository;
import com.example.fullstackbackend.services.TaiKhoanNhanVienService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
class TaiKhoanNhanVienServiceImpl implements TaiKhoanNhanVienService {
    @Autowired
    private TaiKhoanNhanVienRepository taiKhoanRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String formMail;

    public void sendEmail(String mail, String content) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(formMail);
        message.setTo(mail);
        message.setSubject("Mật khẩu Mới");
        message.setText("Mật Khẩu: "+content);

        mailSender.send(message);
    }

    @Override
    public List<TaiKhoan> getAll() {
        return taiKhoanRepository.findAll();
    }
    @Override
    public List<TaiKhoan> chucVu() {
        return taiKhoanRepository.chucVu();
    }

    // Mã hóa mật khẩu
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    @Override
    public TaiKhoan add(TaiKhoan taiKhoan) {
        taiKhoan.setMatKhau(hashPassword(taiKhoan.getMatKhau()));
        TaiKhoan savedTaiKhoan = taiKhoanRepository.save(taiKhoan);

        return savedTaiKhoan;
    }


    @Override
    public Optional<TaiKhoan> getOne(Integer id) {
        return taiKhoanRepository.findById(id);
    }

    @Override
    public TaiKhoan delete(Integer id) {
        TaiKhoan taiKhoan = getOne(id).orElseThrow();
        taiKhoan.setTrangThai(10);
        taiKhoanRepository.save(taiKhoan);
        return taiKhoan;
    }

    @Transactional
    @Override
    public TaiKhoan update(TaiKhoan taiKhoan, Integer id) {
        taiKhoan.setMatKhau(hashPassword(taiKhoan.getMatKhau()));
        taiKhoan.setIdTaiKhoan(id);
        return taiKhoanRepository.save(taiKhoan);
    }

    @Override
    public Boolean existsById(Integer id) {
        return taiKhoanRepository.existsById(id);
    }

    @Override
    public Optional<TaiKhoan> detail(Integer id) {
        Optional<TaiKhoan> taiKhoan = taiKhoanRepository.findById(id);
        return taiKhoan;
    }


}
