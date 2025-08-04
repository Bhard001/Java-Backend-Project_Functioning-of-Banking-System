package com.bankingsystem.security;

import io.jsonwebtoken.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "your_secret_key_here"; // 🔐 Use environment variable in real apps
    private final long EXPIRATION_TIME = 1000 * 60 * 60 * 10; // 10 hours

    // 1. Generate token
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                .compact();
    }

    // 2. Extract username from token
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // 3. Validate token against UserDetails
    public boolean validateToken(String token, UserDetails userDetails) {
        final String extractedUsername = extractUsername(token);
        return extractedUsername.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    // 4. Check if token is expired
    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    // 5. Parse and extract claims from JWT
    private Claims extractClaims(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}
