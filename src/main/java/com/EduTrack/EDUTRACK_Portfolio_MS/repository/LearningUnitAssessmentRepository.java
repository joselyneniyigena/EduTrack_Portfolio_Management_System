package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Assessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnitAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningUnitAssessmentRepository extends JpaRepository<LearningUnitAssessment, Long> {
    List<LearningUnitAssessment> findByAssessment(Assessment assessment);
}
