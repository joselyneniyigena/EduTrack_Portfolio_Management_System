package com.EduTrack.EDUTRACK_Portfolio_MS.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppUserDTO {
    private Long id;
    private String username;
    private LocalDateTime registrationDate;
    private String email;
    private boolean enabled;
    private Long referenceId;
    private List<String> roles;
}
