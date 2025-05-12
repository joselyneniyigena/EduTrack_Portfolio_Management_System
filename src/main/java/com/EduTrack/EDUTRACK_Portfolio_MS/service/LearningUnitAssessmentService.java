package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnitAssessment;

import java.util.List;
import java.util.Optional;

public interface LearningUnitAssessmentService {
    LearningUnitAssessment create(LearningUnitAssessment lua);
    LearningUnitAssessment update(Long id, LearningUnitAssessment updated);
    void delete(Long id);
    Optional<LearningUnitAssessment> getById(Long id);
    List<LearningUnitAssessment> getAll();
    List<LearningUnitAssessment> getByAssessmentId(Long assessmentId);
}
