package com.example.fullstackbackend.config;

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

    private final TaiKhoanKhachHangRepository taiKhoanKhachHangRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        String userName, password = null;
        List<GrantedAuthority> authorities = null;
        List<TaiKhoan> customer = taiKhoanKhachHangRepository.findByEmail(username);
        if (customer.size() == 0) {
            throw new UsernameNotFoundException("User details not found for the user : " + username);
        } else{
            userName = customer.get(0).getEmail();
            password = customer.get(0).getMatKhau();
            authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(customer.get(0).getIdChucVu().getMaCv()));
        }
        return new User(username,password,authorities);
//        // Check taiKhoan
//
//        TaiKhoan taiKhoan = taiKhoanKhachHangRepository.findByEmail(username);
//        System.out.println("taiKhoan: " + taiKhoan.getTen());
//        if (username == null) {
//            throw new UsernameNotFoundException(username);
//        }
//        return new CustomUserDetails(taiKhoan);
    }
}
