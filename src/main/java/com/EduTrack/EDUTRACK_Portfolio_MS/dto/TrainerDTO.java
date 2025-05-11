package com.EduTrack.EDUTRACK_Portfolio_MS.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TrainerDTO {
    private Long id;
    private String trainerId;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String gender;
    private String maritalStatus;
    private String email;
    private String phoneNbr;
    private String address;
}