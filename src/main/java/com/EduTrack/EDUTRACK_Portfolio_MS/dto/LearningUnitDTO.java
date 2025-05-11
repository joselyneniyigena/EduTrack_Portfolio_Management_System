package com.EduTrack.EDUTRACK_Portfolio_MS.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningUnitDTO {
    private Long id;
    private String name;
    private String objective;
    private String description;
    private String learningOutcome;
    private Long moduleId;
}