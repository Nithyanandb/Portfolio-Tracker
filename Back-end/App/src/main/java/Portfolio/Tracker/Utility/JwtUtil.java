package Portfolio.Tracker.Utility;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.ArrayList;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    private Key secretKey;

    public JwtUtil() {
        this.secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);  // Generate a secret key
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
                .signWith(secretKey)
                .compact();
    }

    // Extracts the username (subject) from the token
    public String getUsernameFromToken(String token) {
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (JwtException | IllegalArgumentException e) {
            // Log or handle the exception as needed
            throw new JwtException("Error extracting username from token", e);
        }
    }

    public boolean validateToken(String token) {
        try {
            String username = getUsernameFromToken(token);
            return username != null && !isTokenExpired(token);
        } catch (JwtException e) {
            // Token is invalid or has expired
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        try {
            Date expiration = extractExpiration(token);
            return expiration.before(new Date());
        } catch (JwtException e) {
            throw new JwtException("Error checking token expiration", e);
        }
    }

    private Date extractExpiration(String token) {
        try {
            return extractClaim(token, Claims::getExpiration);
        } catch (JwtException e) {
            throw new JwtException("Error extracting expiration date from token", e);
        }
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        try {
            final Claims claims = extractAllClaims(token);
            return claimsResolver.apply(claims);
        } catch (JwtException e) {
            throw new JwtException("Error extracting claim from token", e);
        }
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SignatureException e) {
            throw new JwtException("JWT signature does not match", e);
        } catch (ExpiredJwtException e) {
            throw new JwtException("JWT token is expired", e);
        } catch (MalformedJwtException e) {
            throw new JwtException("JWT token is malformed", e);
        } catch (UnsupportedJwtException e) {
            throw new JwtException("JWT token is unsupported", e);
        } catch (IllegalArgumentException e) {
            throw new JwtException("JWT token is invalid", e);
        }
    }

    public Authentication getAuthentication(String token) {
        try {
            String username = getUsernameFromToken(token);
            UserDetails userDetails = new User(username, "", new ArrayList<>());
            return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
        } catch (JwtException e) {
            // Handle error or return null if needed
            throw new JwtException("Error during authentication from token", e);
        }
    }
}
