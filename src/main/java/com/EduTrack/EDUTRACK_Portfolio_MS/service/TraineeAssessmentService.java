package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineeAssessment;

import java.util.List;
import java.util.Optional;

public interface TraineeAssessmentService {
    TraineeAssessment createTraineeAssessment(TraineeAssessment assessment);
    TraineeAssessment updateTraineeAssessment(Long id, TraineeAssessment updated);
    void deleteTraineeAssessment(Long id);
    Optional<TraineeAssessment> getTraineeAssessmentById(Long id);
    List<TraineeAssessment> getAllTraineeAssessments();
    List<TraineeAssessment> getByTraineePromotionId(Long promotionId);
    List<TraineeAssessment> getByLearningUnitAssessmentId(Long learningUnitAssessmentId);
}
