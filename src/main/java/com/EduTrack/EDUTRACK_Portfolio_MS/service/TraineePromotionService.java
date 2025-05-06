package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainee;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineePromotion;

import java.util.List;

public interface TraineePromotionService {
    TraineePromotion save(TraineePromotion promotion);
    TraineePromotion findById(Long id);
    List<TraineePromotion> findByTrainee(Trainee trainee);
    List<TraineePromotion> findAll();
    TraineePromotion update(TraineePromotion traineePromotion);
    void deleteById(Long id);
}
