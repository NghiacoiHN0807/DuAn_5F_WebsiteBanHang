package com.example.fullstackbackend.services.impl;

import com.example.fullstackbackend.config.HMACSHA256;
import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
@Service

public class MomoPaymentService {
    private final RestTemplate restTemplate;
    @Value("${momo.payment.api.endpoint}")
    private String momoApiEndpoint;

    @Value("${momo.payment.partnerCode}")
    private String partnerCode;

    @Value("${momo.payment.accessKey}")
    private String accessKey;

    @Value("${momo.payment.secretKey}")
    private String secretKey;

//    private final RestTemplate restTemplate;

    public MomoPaymentService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String createPaymentRequest(String orderId, BigDecimal amount) {
        // Build request data
        Map<String, Object> requestData = new HashMap<>();
        requestData.put("partnerCode", partnerCode);
        requestData.put("accessKey", accessKey);
        requestData.put("requestId", UUID.randomUUID().toString());
        requestData.put("amount", amount);
        requestData.put("orderId", orderId);
        requestData.put("orderInfo", "Payment for order " + orderId);
        requestData.put("returnUrl", "http://your_return_url");
        requestData.put("notifyUrl", "http://your_notify_url");
        requestData.put("requestType", "captureMoMoWallet"); // Add the requestType field

        // Generate signature
        // ... (your existing code for generating the signature)


        // Generate signature
        // Convert BigDecimal amount to string
        String amountStr = amount.toString();
        requestData.put("amount", amountStr);
        String rawData = "partnerCode=" + partnerCode +
                "&accessKey=" + accessKey +
                "&requestId=" + requestData.get("requestId") +
                "&amount=" + amount +
                "&orderId=" + orderId +
                "&orderInfo=" + requestData.get("orderInfo") +
                "&returnUrl=" + requestData.get("returnUrl") +
                "&notifyUrl=" + requestData.get("notifyUrl");
        String signature = HMACSHA256.sign(rawData, secretKey);

        requestData.put("signature", signature);

        // Make payment request to Momo API
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestData, headers);

        ResponseEntity<String> responseEntity = restTemplate.postForEntity(momoApiEndpoint, requestEntity, String.class);
        return responseEntity.getBody();
    }
}
