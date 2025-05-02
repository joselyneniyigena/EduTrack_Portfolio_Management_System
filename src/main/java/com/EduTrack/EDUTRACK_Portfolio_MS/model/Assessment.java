package com.EduTrack.EDUTRACK_Portfolio_MS.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private AssessmentType type;
    private LocalDateTime dateTime;
    private AssessmentCategory category;
    private Location location;
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

    public enum Location {
        CLASS, SITE, ONLINE
    }
}
