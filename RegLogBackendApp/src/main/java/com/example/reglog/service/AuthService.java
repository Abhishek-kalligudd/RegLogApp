package com.example.reglog.service;

import com.example.reglog.dto.LoginRequest;
import com.example.reglog.entity.JwtToken;
import com.example.reglog.entity.User;
import com.example.reglog.repository.JwtTokenRepository;
import com.example.reglog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private JwtTokenRepository jwtTokenRepository;

    @Autowired
    private org.springframework.security.core.userdetails.UserDetailsService userDetailsService;

    @Transactional
    public String login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        User user = userRepository.findByName(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        String jwtToken = jwtService.generateToken(userDetails);

        // Store token in DB
        JwtToken token = new JwtToken();
        token.setUser(user);
        token.setToken(jwtToken);
        token.setCreatedAt(LocalDateTime.now());
        token.setExpiredAt(jwtService.extractExpiration(jwtToken).toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime());
        
        jwtTokenRepository.save(token);

        return jwtToken;
    }

    @Transactional
    public void logout(String token) {
        if (token != null) {
            jwtTokenRepository.findByToken(token).ifPresent(jwtToken -> {
                jwtTokenRepository.delete(jwtToken);
            });
        }
    }
}
