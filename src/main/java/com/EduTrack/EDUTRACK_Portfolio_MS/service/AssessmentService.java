package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Assessment;

import java.util.List;
import java.util.Optional;

public interface AssessmentService {
    Assessment createAssessment(Assessment assessment);
    Assessment updateAssessment(Long id, Assessment updatedAssessment);
    void deleteAssessment(Long id);
    List<Assessment> getAllAssessments();
    Optional<Assessment> getAssessmentById(Long id);
    List<Assessment> getAssessmentsByTermId(Long termId);
    List<Assessment> getAssessmentsByTrainerModuleId(Long trainerModuleId);
}
