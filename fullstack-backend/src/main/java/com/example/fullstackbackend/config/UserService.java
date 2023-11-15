package com.example.fullstackbackend.config;

import com.example.fullstackbackend.config.user.TaiKhoanUser;
import com.example.fullstackbackend.config.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        // Check taiKhoan

        TaiKhoanUser taiKhoan = userRepository.findByEmail(username);
        if (username == null) {
            throw new UsernameNotFoundException(username);
        }
        return new CustomUserDetails(taiKhoan);
    }
}
