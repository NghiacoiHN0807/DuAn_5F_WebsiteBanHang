package com.example.fullstackbackend.config;

import com.example.fullstackbackend.entity.TaiKhoan;
import com.example.fullstackbackend.repository.TaiKhoanKhachHangRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class LoginController {
    @Autowired
    private TaiKhoanKhachHangRepository customerRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

//    @PostMapping("/register")
//    public ResponseEntity<String> registerUser(@RequestBody TaiKhoan customer) {
//        TaiKhoan savedCustomer = null;
//        ResponseEntity response = null;
//        try {
//            String hashPwd = passwordEncoder.encode(customer.getMatKhau());
//            customer.setMatKhau(hashPwd);
//            savedCustomer = customerRepository.save(customer);
//            if (savedCustomer.getIdTaiKhoan() > 0) {
//                response = ResponseEntity
//                        .status(HttpStatus.CREATED)
//                        .body("Given user details are successfully registered");
//            }
//        } catch (Exception ex) {
//            response = ResponseEntity
//                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body("An exception occured due to " + ex.getMessage());
//        }
//        return response;
//    }

    @PostMapping("/add")
    public ResponseEntity<?> add(@Valid @RequestBody TaiKhoan taiKhoankh,
                                 BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            List<FieldError> fieldErrors = bindingResult.getFieldErrors();

            for (FieldError fieldError : fieldErrors) {
                errorMap.put(fieldError.getField(), fieldError.getDefaultMessage());
            }

            return ResponseEntity.badRequest().body(errorMap);
        } else {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            TaiKhoan addTK = new TaiKhoan();
            addTK.setMatKhau(encoder.encode(taiKhoankh.getMatKhau()));
            customerRepository.save(taiKhoankh);
            return ResponseEntity.ok(addTK);
        }
    }


}
