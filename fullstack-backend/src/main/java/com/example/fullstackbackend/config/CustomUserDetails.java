package com.example.fullstackbackend.config;

import com.example.fullstackbackend.config.user.TaiKhoanUser;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomUserDetails implements UserDetails {

    private TaiKhoanUser taiKhoan;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        List<GrantedAuthority> authorities = new ArrayList<>();

        if (taiKhoan.getIdChucVu().getMaCv().equalsIgnoreCase("CV01")) {
            authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
        } else if (taiKhoan.getIdChucVu().getMaCv().equalsIgnoreCase("CV02")) {
            authorities.add(new SimpleGrantedAuthority("ROLE_STAFF"));
        } else if (taiKhoan.getIdChucVu().getMaCv().equalsIgnoreCase("CV03")) {
            authorities.add(new SimpleGrantedAuthority("ROLE_CUSTOMER"));
        }
        System.out.println("\nauthorities: " + authorities);

        return authorities;
    }

    @Override
    public String getPassword() {
        return taiKhoan.getMatKhau();
    }

    @Override
    public String getUsername() {
        return taiKhoan.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
