package com.EduTrack.EDUTRACK_Portfolio_MS.controller;


import com.EduTrack.EDUTRACK_Portfolio_MS.dto.AuthResponse;
import com.EduTrack.EDUTRACK_Portfolio_MS.dto.JwtRequest;
import com.EduTrack.EDUTRACK_Portfolio_MS.dto.SignupRequest;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.User;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.impl.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class JwtAuthenticationController {

    private final CustomUserDetailsService userDetailsService;



    @PostMapping("/authenticate")
    public AuthResponse signIn(@RequestBody JwtRequest authenticationRequest) throws Exception {
        return  userDetailsService.signIn(authenticationRequest);
    }


    @PostMapping("/signup")
    public User registerUser(@RequestBody SignupRequest signupRequest) throws Exception {
        return userDetailsService.registerUser(signupRequest);
    }



}
