package com.EduTrack.EDUTRACK_Portfolio_MS.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmailTemplate {
    private final String subject;
    private final String template;

}