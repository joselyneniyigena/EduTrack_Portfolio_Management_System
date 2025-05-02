package com.EduTrack.EDUTRACK_Portfolio_MS.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Evidence {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private String content;

    @ManyToOne
    @JoinColumn(name = "trainee_assessment_id")
    private TraineeAssessment traineeAssessment;
}
