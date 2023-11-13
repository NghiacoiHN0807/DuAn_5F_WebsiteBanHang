package com.example.fullstackbackend.config;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

@WebFilter("/*")
public class CorsFilter implements Filter {
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        // Add CORS headers to the response
        HttpServletResponse httpResponse = (HttpServletResponse) response;
        httpResponse.addHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        httpResponse.addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        httpResponse.addHeader("Access-Control-Allow-Headers", "Content-Type");

        // Continue with the chain
        chain.doFilter(request, response);
    }
}
