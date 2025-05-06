package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnitAssessment;

import java.util.List;

public interface LearningUnitAssessmentService {
    LearningUnitAssessment save(LearningUnitAssessment lua);
    LearningUnitAssessment findById(Long id);
    List<LearningUnitAssessment> findAll();
    LearningUnitAssessment update(LearningUnitAssessment lua);
    void deleteById(Long id);
}
