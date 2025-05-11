package com.EduTrack.EDUTRACK_Portfolio_MS.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SchoolProfileDTO {
    private Long id;
    private String name;
    private String logo;
    private String phoneNbr;
    private String email;
    private String address;
    private String description;
}
