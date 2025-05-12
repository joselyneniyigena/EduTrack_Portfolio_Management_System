package com.EduTrack.EDUTRACK_Portfolio_MS.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private AssessmentType type;

    private LocalDateTime dateTime;

    @Enumerated(EnumType.STRING)
    private AssessmentCategory category;

    @Enumerated(EnumType.STRING)
    private AssessmentLocation location;

    private String term;

    @ManyToOne
    @JoinColumn(name = "trainer_module_id")
    private TrainerModule trainerModule;

    public enum AssessmentType {
        FORMATIVE, INTEGRATED
    }

    public enum AssessmentCategory {
        PRACTICAL, WRITTEN, PRESENTATION, INTERVIEW
    }

    public enum AssessmentLocation {
        CLASS, SITE, ONLINE
    }
}
