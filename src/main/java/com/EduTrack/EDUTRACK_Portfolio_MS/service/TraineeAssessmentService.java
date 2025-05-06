package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineeAssessment;

import java.util.List;

public interface TraineeAssessmentService {
    TraineeAssessment save(TraineeAssessment ta);
    TraineeAssessment findById(Long id);
    List<TraineeAssessment> findAll();
    TraineeAssessment update(TraineeAssessment ta);
    void deleteById(Long id);
}
