package com.example.fullstackbackend.config;

import com.example.fullstackbackend.config.user.TaiKhoanUser;
import com.example.fullstackbackend.config.user.UserRepository;
import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.repository.TaiKhoanKhachHangRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        // Check taiKhoan

        TaiKhoanUser taiKhoan = userRepository.findByEmail(username);
        System.out.println("taiKhoan: " + taiKhoan.getTen());
        if (username == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(taiKhoan);
    }
}
