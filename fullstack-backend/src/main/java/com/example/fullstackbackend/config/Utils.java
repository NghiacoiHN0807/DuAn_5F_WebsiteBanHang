package com.example.fullstackbackend.config;

import jakarta.servlet.http.HttpServletRequest;

public class Utils {
    public static String getBaseURL(HttpServletRequest request){
        String scheme = request.getScheme();
        String severName = request.getServerName();
        int severPort = request.getServerPort();
        String contexPath = request.getContextPath();
        StringBuffer url = new StringBuffer();
        url.append(scheme).append("://").append(severName);
        if ((severPort != 80) && (severPort != 443)){
            url.append("/");
        }
        url.append(contexPath);
        if (url.toString().endsWith("/")){
            url.append("/");
        }
        return url.toString();
    }
}
