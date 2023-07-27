package com.example.fullstackbackend.config;

import org.apache.commons.codec.digest.HmacUtils;


public class HMACSHA256 {

    public static String sign(String data, String key) {
        return HmacUtils.hmacSha256Hex(key, data);
    }
}

