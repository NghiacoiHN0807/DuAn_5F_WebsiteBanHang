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
        String pass = TaiKhoan.generateRandomPassword();
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String PassEncode = encoder.encode(pass);
        sendEmail(taiKhoan.getEmail(), pass);
        taiKhoan.setMatKhau(PassEncode);

        return taiKhoanRepository.save(taiKhoan);
    }


    @Override
    public Optional<TaiKhoan> getOne(Integer id) {
        return taiKhoanRepository.findById(id);
    }

    @Transactional
    @Override
    public Boolean delete(Integer id, Integer trangThai) {
        try {
            TaiKhoan taiKhoan = getOne(id).orElseThrow();
            taiKhoan.setTrangThai(trangThai);
            taiKhoanRepository.save(taiKhoan);
            return true;
        }catch (Exception e){
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    @Override
    public Boolean deleteAll(List<Integer> id) {
       try {
           for( Integer s : id){
               TaiKhoan taiKhoan = getOne(s).orElseThrow();
               taiKhoan.setTrangThai(10);
               taiKhoanRepository.save(taiKhoan);
           }
           return  true;
       }catch (Exception e){
           e.printStackTrace();
           return  false;
       }
    }

    @Override
    public Boolean checkMailExists(String email) {
        return taiKhoanRepository.existsByEmailAllIgnoreCase(email);
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
    public Boolean changePass(TaiKhoan tk, String pass, String passChange) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String matKhauMaHoa = tk.getMatKhau();
        String matKhauBanDau = encoder.matches(pass, matKhauMaHoa) ? pass : null;
        if (matKhauBanDau == null){
            return false;
        }else {
            String PassEncode = encoder.encode(passChange);
            tk.setMatKhau(PassEncode);
            taiKhoanRepository.save(tk);
            return true;
        }
    }

    @Override
    public Optional<TaiKhoan> detail(Integer id) {
        Optional<TaiKhoan> taiKhoan = taiKhoanRepository.findById(id);
        return taiKhoan;
    }


}
