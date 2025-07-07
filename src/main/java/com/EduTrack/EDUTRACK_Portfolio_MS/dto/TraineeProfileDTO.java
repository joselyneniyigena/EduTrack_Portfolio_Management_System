package com.EduTrack.EDUTRACK_Portfolio_MS.dto;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.RTQFLevel;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Sector;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trade;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TraineeProfileDTO {
    private long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String traineeId;
    private LocalDate dob;
    private String gender;
    private String maritalStatus;
    private RTQFLevel level;
    private Sector sector;
    private Trade trade;
    private String professionalBackground;
    private String previousExperience;
    private String qualifications;
    private String emergencyContactName;
    private String emergencyContactPhone;
    private String nationality;
    private String languagePreference;
}