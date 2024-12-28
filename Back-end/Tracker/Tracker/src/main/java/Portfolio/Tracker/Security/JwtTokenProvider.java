package Portfolio.Tracker.Security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import Portfolio.Tracker.Service.KeyStorage;
import javax.crypto.SecretKey;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Value;

@Component
public class JwtTokenProvider {
    private final KeyStorage keyStorage;
    private final long jwtExpiration;

    public JwtTokenProvider(KeyStorage keyStorage, @Value("${app.jwt.expiration}") long jwtExpiration) {
        this.keyStorage = keyStorage;
        this.jwtExpiration = jwtExpiration;
    }

    public void invalidateToken(String token) {
        if (token != null) {
            keyStorage.removeKey(token);
        }
    }

    public String generateToken(Authentication authentication) {
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        String token = Jwts.builder()
                .setSubject(authentication.getName())
                .claim("roles", authentication.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.toList()))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(key)
                .compact();
        
        keyStorage.storeKey(token, key);
        return token;
    }

    public String generateTokenForOAuth2(String email, Collection<? extends GrantedAuthority> authorities) {
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        
        List<String> roles = authorities.stream()
            .map(GrantedAuthority::getAuthority)
            .filter(role -> role.startsWith("ROLE_") || role.equals("OAUTH2_USER"))
            .collect(Collectors.toList());

        String token = Jwts.builder()
                .setSubject(email)
                .claim("roles", roles)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(key)
                .compact();

        keyStorage.storeKey(token, key);
        return token;
    }

    public String getEmailFromToken(String token) {
        return getUsernameFromToken(token); // This is the same as getting email
    }

    public String getUsernameFromToken(String token) {
        SecretKey key = keyStorage.getKey(token);
        if (key == null) {
            throw new JwtException("Invalid token");
        }

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String token) {
        try {
            SecretKey key = keyStorage.getKey(token);
            if (key == null) {
                return false;
            }

            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    @SuppressWarnings("unchecked")
    public Set<String> getRolesFromToken(String token) {
        SecretKey key = keyStorage.getKey(token);
        if (key == null) {
            throw new JwtException("Invalid token");
        }

        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        List<String> roles = claims.get("roles", List.class);
        return roles != null ? new HashSet<>(roles) : new HashSet<>();
    }
}