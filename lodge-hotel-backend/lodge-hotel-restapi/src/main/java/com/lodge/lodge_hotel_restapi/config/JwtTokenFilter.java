package com.lodge.lodge_hotel_restapi.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import java.io.IOException;
import java.security.KeyStore;
import java.security.PublicKey;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtTokenFilter extends OncePerRequestFilter {

    @Value("${keyStore.alias}")
    private String keyStoreAlias;

    private final KeyStore keyStore;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null &&  authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                PublicKey publicKey = keyStore.getCertificate(keyStoreAlias).getPublicKey();

                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(publicKey)
                        .build()
                        .parseClaimsJws(token)
                        .getBody();

                List<String> roles = claims.get("role", List.class);
                List<GrantedAuthority> authorities = roles.stream().map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());

                Long userId = claims.get("userId", Long.class);

                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userId, null, authorities);
                authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authenticationToken);

            } catch (Exception e) {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED,"Invalid Jwt Token.");
                throw new RuntimeException(e);
            }
        }

        filterChain.doFilter(request, response);
    }
}
