package com.example.fullstackbackend.controller;

import com.example.fullstackbackend.services.impl.MomoPaymentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/payment/")
public class PaymentMomoController {
    private final MomoPaymentService momoPaymentService;

    public PaymentMomoController(MomoPaymentService momoPaymentService) {
        this.momoPaymentService = momoPaymentService;
    }

    @PostMapping("initiate-payment")
    public ResponseEntity<String> initiatePayment(@RequestParam("orderId") String orderId,
                                                  @RequestParam("amount") BigDecimal amount) {
        String amountStr = amount.toString();
        String paymentResponse = momoPaymentService.createPaymentRequest(orderId, amount);
        return ResponseEntity.ok(paymentResponse);
    }
}
