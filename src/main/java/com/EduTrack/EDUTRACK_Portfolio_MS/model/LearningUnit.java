package com.EduTrack.EDUTRACK_Portfolio_MS.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LearningUnit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String objective;
    private String description;
    private String learningOutcome;

    @ManyToOne
    @JoinColumn(name = "module_course_id")
    private ModuleCourse moduleCourse;
}
