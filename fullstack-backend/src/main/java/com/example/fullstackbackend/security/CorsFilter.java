package com.example.fullstackbackend.security;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;

@WebFilter("/*")
public class CorsFilter implements Filter {

    @Value("${fontend.url}")
    private String url;

    @Value("${fontend.allowed-methods}")
    private String methods;

    @Value("${fontend.allowed-headers}")
    private String type;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // Add CORS headers to the response
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.addHeader("Access-Control-Allow-Origin", url);
        httpResponse.addHeader("Access-Control-Allow-Methods", methods);
        httpResponse.addHeader("Access-Control-Allow-Headers", type);

        // Continue with the chain
        chain.doFilter(request, response);
    }
}
