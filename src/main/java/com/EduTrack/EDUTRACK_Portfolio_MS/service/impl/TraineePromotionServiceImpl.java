package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainee;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineePromotion;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TraineePromotionRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TraineeRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TraineePromotionService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor

public class TraineePromotionServiceImpl implements TraineePromotionService {

    private final TraineePromotionRepository traineePromotionRepository;
    private final TraineeRepository traineeRepository;
    @Override
    public TraineePromotion createPromotion(TraineePromotion promotion) {
        return traineePromotionRepository.save(promotion);
    }

    @Override
    public TraineePromotion updatePromotion(Long id, TraineePromotion updatedPromotion) {
        TraineePromotion existing = traineePromotionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trainee Promotion not found with ID: " + id));

        existing.setTerm(updatedPromotion.getTerm());
        existing.setTrade(updatedPromotion.getTrade());
        existing.setStatus(updatedPromotion.getStatus());

        if (updatedPromotion.getTrainee() != null) {
            Trainee trainee = traineeRepository.findById(updatedPromotion.getTrainee().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Trainee not found"));
            existing.setTrainee(trainee);
        }

        return traineePromotionRepository.save(existing);
    }

    @Override
    public void deletePromotion(Long id) {
        traineePromotionRepository.deleteById(id);
    }

    @Override
    public Optional<TraineePromotion> getPromotionById(Long id) {
        return traineePromotionRepository.findById(id);
    }

    @Override
    public List<TraineePromotion> getAllPromotions() {
        return traineePromotionRepository.findAll();
    }

    @Override
    public List<TraineePromotion> getPromotionsByTraineeId(Long traineeId) {
        Trainee trainee = traineeRepository.findById(traineeId)
                .orElseThrow(() -> new EntityNotFoundException("Trainee not found"));
        return traineePromotionRepository.findByTrainee(trainee);
    }
}
