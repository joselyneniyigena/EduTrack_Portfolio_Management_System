package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnitAssessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineeAssessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineePromotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TraineeAssessmentRepository extends JpaRepository<TraineeAssessment, Long> {
    List<TraineeAssessment> findByTraineePromotion(TraineePromotion promotion);
    List<TraineeAssessment> findByLearningUnitAssessment(LearningUnitAssessment assessment);
}
