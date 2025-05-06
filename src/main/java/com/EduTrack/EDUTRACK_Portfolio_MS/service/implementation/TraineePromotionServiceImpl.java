package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainee;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineePromotion;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TraineePromotionRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TraineePromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class TraineePromotionServiceImpl implements TraineePromotionService {

    private final TraineePromotionRepository repository;
    @Override
    public TraineePromotion save(TraineePromotion promotion) {
        return repository.save(promotion);
    }

    @Override
    public TraineePromotion findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<TraineePromotion> findByTrainee(Trainee trainee) {
        return repository.findByTrainee(trainee);
    }

    @Override
    public List<TraineePromotion> findAll() {
        return repository.findAll();
    }

    @Override
    public TraineePromotion update(TraineePromotion traineePromotion) {
        return repository.save(traineePromotion);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
