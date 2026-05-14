package br.com.prpp.tudosaoflores.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

    private final String secret = "dGhpcyBpcyBhIHNlY3JldCBrZXkgZm9yIGp3dCB0ZXN0aW5nIHB1cnBvc2Vz";
    private final byte[] keyBytes = Base64.getDecoder().decode(secret);
    private final long expiration = 86400000L; // 24 horas

    public String generateToken(String email, Long clienteId) {
        return Jwts.builder()
                .setSubject(email)
                .claim("clienteId", clienteId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS256, keyBytes)
                .compact();
    }

    public Claims extractClaims(String token) {
        return Jwts.parser()                     // ✅ API estável e compatível
                .setSigningKey(keyBytes)
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    public Long extractClienteId(String token) {
        return extractClaims(token).get("clienteId", Long.class);
    }

    public boolean isTokenValid(String token) {
        try {
            extractClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
}