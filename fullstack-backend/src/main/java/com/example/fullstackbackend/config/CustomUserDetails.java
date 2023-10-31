//package com.example.fullstackbackend.config;
//
//import com.example.fullstackbackend.entity.TaiKhoan;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.List;
//
//@Data
//@AllArgsConstructor
//public class CustomUserDetails implements UserDetails {
//
//    TaiKhoan taiKhoan;
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//
//        List<GrantedAuthority> authorities = new ArrayList<>();
//
//        if (taiKhoan.getIdChucVu().getMaCv().equalsIgnoreCase("CV01")) {
//            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
//        } else if (taiKhoan.getIdChucVu().getMaCv().equalsIgnoreCase("CV02")) {
//            authorities.add(new SimpleGrantedAuthority("ROLE_STAFF"));
//        } else if (taiKhoan.getIdChucVu().getMaCv().equalsIgnoreCase("CV03")) {
//            authorities.add(new SimpleGrantedAuthority("ROLE_CUSTOMER"));
//        }
//
//        return authorities;
//    }
//
//    @Override
//    public String getPassword() {
//        return null;
//    }
//
//    @Override
//    public String getUsername() {
//        return null;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return false;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return false;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return false;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return false;
//    }
//}
