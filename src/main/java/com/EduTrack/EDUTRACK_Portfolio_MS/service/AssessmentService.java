package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Assessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TrainerModule;

import java.util.List;

public interface AssessmentService {
    Assessment save(Assessment assessment);
    Assessment findById(Long id);
    List<Assessment> findByTrainerModule(TrainerModule trainerModule);
    List<Assessment> findAll();
    Assessment update(Assessment assessment);
    void deleteById(Long id);
}
