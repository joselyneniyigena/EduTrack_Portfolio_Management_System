package com.EduTrack.EDUTRACK_Portfolio_MS.model;

import com.fasterxml.jackson.annotation.JsonCreator;
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

    @ManyToOne
    @JoinColumn(name = "term_id")
    private Term term;

    @ManyToOne
    @JoinColumn(name = "trainer_module_id")
    private TrainerModule trainerModule;

    public enum AssessmentType {
        FORMATIVE, INTEGRATED;

        @JsonCreator
        public static AssessmentType fromString(String value) {
            return AssessmentType.valueOf(value.toUpperCase());
        }

        @Override
        public String toString() {
            return name();
        }
    }

    public enum AssessmentCategory {
        PRACTICAL, WRITTEN, PRESENTATION, INTERVIEW;

        @JsonCreator
        public static AssessmentCategory fromString(String value) {
            return AssessmentCategory.valueOf(value.toUpperCase());
        }

        @Override
        public String toString() {
            return name();
        }
    }

    public enum AssessmentLocation {
        CLASS, SITE, ONLINE;

        @JsonCreator
        public static AssessmentLocation fromString(String value) {
            return AssessmentLocation.valueOf(value.toUpperCase());
        }

        @Override
        public String toString() {
            return name();
        }
    }
}
