package com.example.fullstackbackend.services.impl;


import com.example.fullstackbackend.entity.ChucVu;
import com.example.fullstackbackend.entity.GioHang;
import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.repository.GioHangReponsitory;
import com.example.fullstackbackend.repository.TaiKhoanKhachHangRepository;
import com.example.fullstackbackend.services.TaiKhoanKhachHangSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
public class TaiKhoanKhachHangServiceImpl implements TaiKhoanKhachHangSevice {

    @Autowired
    private TaiKhoanKhachHangRepository TaiKhoanKhachHangRepository;

    @Autowired
    private GioHangReponsitory gioHangReponsitory;

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
        return TaiKhoanKhachHangRepository.findAllKhachHang();
    }

    @Override
    public Page<TaiKhoan> Page(Integer pageNo, Integer size) {
        Pageable pageable = PageRequest.of(pageNo, size);
        return TaiKhoanKhachHangRepository.findAll(pageable);
    }

    @Override
    public List<TaiKhoan> PageKhachHang() {
        return TaiKhoanKhachHangRepository.findAllKhachHang();
    }

    @Override
    public TaiKhoan add(TaiKhoan add) {
        ChucVu vc = new ChucVu(9,"CV03","Khách Hàng", Date.valueOf("2023-07-23"),0);
        add.setIdChucVu(vc);
        String pass = TaiKhoan.generateRandomPassword();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String PassEncode = encoder.encode(pass);
        sendEmail(add.getEmail(), pass);
        add.setMatKhau(PassEncode);

        return TaiKhoanKhachHangRepository.save(add);
    }

    @Override
    public void delete(Integer id) {
        TaiKhoanKhachHangRepository.XoaMem(id);
    }

    @Override
    public Boolean checkExists(Integer id) {
        return TaiKhoanKhachHangRepository.existsById(id);
    }

    @Override
    public Boolean checkMailExists(String email) {
        return TaiKhoanKhachHangRepository.existsByEmailAllIgnoreCase(email);
    }

    @Override
    public TaiKhoan update(TaiKhoan update) {
        ChucVu vc = new ChucVu(9,"CV03","Khách Hàng", Date.valueOf("2023-07-23"),0);
        update.setIdChucVu(vc);
        if (!update.getMatKhau().startsWith("$2a$10$")){
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String PassEncode = encoder.encode(update.getMatKhau());
            sendEmail(update.getEmail(), update.getMatKhau());
            update.setMatKhau(PassEncode);
        }

        return TaiKhoanKhachHangRepository.save(update);
    }

    @Override
    public Optional<TaiKhoan> detail(String idOrMa) {
        if(TaiKhoanKhachHangRepository.findByMaTaiKhoanOrderByIdTaiKhoanDesc(idOrMa).isPresent()){
            return TaiKhoanKhachHangRepository.findByMaTaiKhoanOrderByIdTaiKhoanDesc(idOrMa);
        } if (TaiKhoanKhachHangRepository.findById(Integer.valueOf(idOrMa)).isPresent()){
            return TaiKhoanKhachHangRepository.findById(Integer.valueOf(idOrMa));
        }
        return null;
    }
}
