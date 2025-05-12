package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineePromotion;

import java.util.List;
import java.util.Optional;

public interface TraineePromotionService {
    TraineePromotion createPromotion(TraineePromotion promotion);
    TraineePromotion updatePromotion(Long id, TraineePromotion updatedPromotion);
    void deletePromotion(Long id);
    Optional<TraineePromotion> getPromotionById(Long id);
    List<TraineePromotion> getAllPromotions();
    List<TraineePromotion> getPromotionsByTraineeId(Long traineeId);
}
