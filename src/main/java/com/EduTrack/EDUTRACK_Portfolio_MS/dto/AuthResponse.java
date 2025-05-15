package com.EduTrack.EDUTRACK_Portfolio_MS.dto;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class AuthResponse implements Serializable {
    private String token;
    private User user;
}