package com.EduTrack.EDUTRACK_Portfolio_MS.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssessmentDTO {
    private Long id;
    private String type;
    private LocalDateTime dateTime;
    private String category;
    private String location;
    private String term;
    private Long trainerModuleId;
}
