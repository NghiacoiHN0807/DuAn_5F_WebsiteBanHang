//package com.example.fullstackbackend.services;
//
//import com.example.fullstackbackend.DTO.PaymentResDTO;
//import jakarta.servlet.http.HttpServletRequest;
//
//import java.io.UnsupportedEncodingException;
//import java.math.BigDecimal;
//import java.util.List;
//
//public interface PaymentsMethodService {
//    List<PaymentsMethodService> findByAllIdBill(String idBill);
//    PaymentsMethodService create(String idBill, String idEmployees, CreatePaymentsMethodRequest request);
//
//    BigDecimal sumTotalMoneyByIdBill(String idBill);
//
//    String payWithVNPAY(PaymentResDTO payModel, HttpServletRequest request) throws UnsupportedEncodingException;
//
//    boolean paymentSuccess(PayMentVnpayResponse response);
//
//    boolean updatepayMent(String idBill,String idEmployees,List<String> ids);
//}
