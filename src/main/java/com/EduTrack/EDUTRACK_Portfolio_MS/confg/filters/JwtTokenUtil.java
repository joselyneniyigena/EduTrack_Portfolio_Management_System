package com.EduTrack.EDUTRACK_Portfolio_MS.confg.filters;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.*;
import java.util.function.Function;

@Component
public class JwtTokenUtil {

    private final Key secret;

    public JwtTokenUtil(@Value("${jwt.secret}") String base64EncodedSecretKey) {
        byte[] decodedKey = Base64.getDecoder().decode(base64EncodedSecretKey);
        this.secret = Keys.hmacShaKeyFor(decodedKey);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(secret)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();

        if (userDetails instanceof User user) {
            if (user.getId() != null) {
                claims.put("userId", user.getId());
            }

            if (user.getUserRoles() != null && !user.getUserRoles().isEmpty()) {
                List<String> roleNames = user.getUserRoles().stream()
                        .filter(Objects::nonNull)
                        .map(userRole -> userRole.getRole().getName().name())
                        .toList();
                claims.put("userRoles", roleNames);  // store all roles
            }
        }

        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours
                .signWith(secret)
                .compact();
    }

    public long getUserIdFromToken(String token) {
        return extractClaim(token, claims -> claims.get("userId", Long.class));
    }

    public String getUsernameFromToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public List<String> getUserRolesFromToken(String token) {
        try {
            Claims claims = extractAllClaims(token);
            Object roles = claims.get("userRoles");
            if (roles instanceof List<?>) {
                return ((List<?>) roles).stream()
                        .filter(Objects::nonNull)
                        .map(Object::toString)
                        .toList();
            }
        } catch (Exception e) {
            return Collections.emptyList();
        }
        return Collections.emptyList();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }
}
