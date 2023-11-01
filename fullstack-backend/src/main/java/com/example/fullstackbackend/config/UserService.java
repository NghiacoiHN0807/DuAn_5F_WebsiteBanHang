package com.example.fullstackbackend.config;

import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.repository.TaiKhoanKhachHangRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
//@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    @Autowired
    private TaiKhoanKhachHangRepository taiKhoanKhachHangRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        // Check taiKhoan

        TaiKhoan taiKhoan = taiKhoanKhachHangRepository.findByEmail(username);
        System.out.println("taiKhoan: "+ taiKhoan.getTen());
        if (username == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(taiKhoan);
    }
}
