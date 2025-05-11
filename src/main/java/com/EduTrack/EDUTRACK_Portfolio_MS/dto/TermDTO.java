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
public class TermDTO {
    private Long id;
    private Long academicYearId;
    private LocalDate startDate;
    private LocalDate endDate;
    private String status;
}