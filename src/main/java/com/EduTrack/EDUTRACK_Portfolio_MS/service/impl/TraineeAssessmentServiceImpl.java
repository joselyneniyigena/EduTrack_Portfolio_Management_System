package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnitAssessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineeAssessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineePromotion;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.LearningUnitAssessmentRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TraineeAssessmentRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TraineePromotionRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TraineeAssessmentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TraineeAssessmentServiceImpl implements TraineeAssessmentService {

    private final TraineeAssessmentRepository traineeAssessmentRepository;
    private final TraineePromotionRepository traineePromotionRepository;
    private final LearningUnitAssessmentRepository learningUnitAssessmentRepository;
    @Override
    public TraineeAssessment createTraineeAssessment(TraineeAssessment assessment) {
        return traineeAssessmentRepository.save(assessment);
    }

    @Override
    public TraineeAssessment updateTraineeAssessment(Long id, TraineeAssessment updated) {
        TraineeAssessment existing = traineeAssessmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TraineeAssessment not found with ID: " + id));

        existing.setStartDate(updated.getStartDate());
        existing.setEndDate(updated.getEndDate());
        existing.setStatus(updated.getStatus());

        if (updated.getLearningUnitAssessment() != null) {
            LearningUnitAssessment lua = learningUnitAssessmentRepository.findById(updated.getLearningUnitAssessment().getId())
                    .orElseThrow(() -> new EntityNotFoundException("LearningUnitAssessment not found"));
            existing.setLearningUnitAssessment(lua);
        }

        if (updated.getTraineePromotion() != null) {
            TraineePromotion promo = traineePromotionRepository.findById(updated.getTraineePromotion().getId())
                    .orElseThrow(() -> new EntityNotFoundException("TraineePromotion not found"));
            existing.setTraineePromotion(promo);
        }

        return traineeAssessmentRepository.save(existing);
    }

    @Override
    public void deleteTraineeAssessment(Long id) {
        traineeAssessmentRepository.deleteById(id);
    }

    @Override
    public Optional<TraineeAssessment> getTraineeAssessmentById(Long id) {
        return traineeAssessmentRepository.findById(id);
    }

    @Override
    public List<TraineeAssessment> getAllTraineeAssessments() {
        return traineeAssessmentRepository.findAll();
    }

    @Override
    public List<TraineeAssessment> getByTraineePromotionId(Long promotionId) {
        TraineePromotion promo = traineePromotionRepository.findById(promotionId)
                .orElseThrow(() -> new EntityNotFoundException("TraineePromotion not found"));
        return traineeAssessmentRepository.findByTraineePromotion(promo);
    }

    @Override
    public List<TraineeAssessment> getByLearningUnitAssessmentId(Long learningUnitAssessmentId) {
        LearningUnitAssessment lua = learningUnitAssessmentRepository.findById(learningUnitAssessmentId)
                .orElseThrow(() -> new EntityNotFoundException("LearningUnitAssessment not found"));
        return traineeAssessmentRepository.findByLearningUnitAssessment(lua);
    }
}
