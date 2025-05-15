package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.confg.filters.JwtTokenUtil;
import com.EduTrack.EDUTRACK_Portfolio_MS.dto.AuthResponse;
import com.EduTrack.EDUTRACK_Portfolio_MS.dto.JwtRequest;
import com.EduTrack.EDUTRACK_Portfolio_MS.dto.SignupRequest;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Role;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.User;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.UserRole;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.RoleRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.UserRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final UserRoleRepository userRoleRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository,
                                    PasswordEncoder passwordEncoder,
                                    RoleRepository roleRepository,
                                    @Lazy AuthenticationManager authenticationManager,
                                    @Lazy JwtTokenUtil jwtTokenUtil, UserRoleRepository userRoleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.roleRepository = roleRepository;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userRoleRepository = userRoleRepository;
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
    }


    public User registerUser(SignupRequest signupRequest) throws Exception {
        if (signupRequest == null || signupRequest.getRoles() == null || signupRequest.getRoles().isEmpty()) {
            throw new Exception("Signup request or roles cannot be empty.");
        }
        signupRequest.setUsername(signupRequest.getUsername().toLowerCase());

        User savedUser = userRepository.save(User.builder()
                .username(signupRequest.getUsername())
                .email(signupRequest.getEmail())
                .firstName(signupRequest.getFirstName())
                .lastName(signupRequest.getLastName())
                .phoneNumber(signupRequest.getPhoneNumber())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .enabled(true)
                .registrationDate(new Date())
                .lastModifiedDate(new Date())
                .build());
        List<Role> roles = signupRequest.getRoles().stream().map(role -> {
            try {
                return roleRepository.findByName(Role.RoleName.valueOf(role))
                        .orElseGet(() -> {
                            Role newRole = new Role(Role.RoleName.valueOf(role));
                            return roleRepository.save(newRole);
                        });
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }).toList();
        roles.forEach(role -> {
            UserRole userRole = UserRole.builder()
                    .user(savedUser)
                    .role(role)
                    .build();
            userRoleRepository.save(userRole);
        });
        return savedUser;
    }

    public AuthResponse signIn(JwtRequest jwtRequest) throws Exception {
        String username = jwtRequest.getUsername().toLowerCase();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("Invalid credentials"));

        if (!user.isEnabled()) {
            throw new Exception("Your account is disabled. Please contact support.");
        }

        authenticate(username, jwtRequest.getPassword());
        final User userDetails = loadUserByUsername(username);
        final String token = jwtTokenUtil.generateToken(userDetails);

        return new AuthResponse(token, user);
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (Exception e) {
            throw new Exception("Invalid username or password", e);
        }
    }
}
