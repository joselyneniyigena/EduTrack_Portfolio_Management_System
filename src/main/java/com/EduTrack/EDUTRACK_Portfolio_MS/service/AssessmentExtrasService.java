package com.EduTrack.EDUTRACK_Portfolio_MS.service;


import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnitAssessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineeAssessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineePromotion;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.LearningUnitAssessmentRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TraineeAssessmentRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TraineePromotionRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssessmentExtrasService {

    private final LearningUnitAssessmentRepository learningUnitAssessmentRepository;
    private final TraineePromotionRepository traineePromotionRepository;
    private final TraineeAssessmentRepository traineeAssessmentRepository;

    // LEARNING UNIT ASSESSMENTS
    public List<LearningUnitAssessment> getAllLearningUnitAssessments() {
        return learningUnitAssessmentRepository.findAll();
    }

    public LearningUnitAssessment getLearningUnitAssessmentById(Long id) {
        return learningUnitAssessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Learning Unit Assessment not found"));
    }

    @Transactional
    public LearningUnitAssessment createLearningUnitAssessment(LearningUnitAssessment a) {
        return learningUnitAssessmentRepository.save(a);
    }

    @Transactional
    public void deleteLearningUnitAssessment(Long id) {
        if (!learningUnitAssessmentRepository.existsById(id))
            throw new RuntimeException("Learning Unit Assessment not found");
        learningUnitAssessmentRepository.deleteById(id);
    }

    // TRAINEE PROMOTIONS
    public List<TraineePromotion> getAllPromotions() {
        return traineePromotionRepository.findAll();
    }

    @Transactional
    public TraineePromotion createPromotion(TraineePromotion p) {
        return traineePromotionRepository.save(p);
    }

    // TRAINEE ASSESSMENTS
    public List<TraineeAssessment> getAllTraineeAssessments() {
        return traineeAssessmentRepository.findAll();
    }

    public TraineeAssessment getTraineeAssessmentById(Long id) {
        return traineeAssessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainee Assessment not found"));
    }

    @Transactional
    public TraineeAssessment createTraineeAssessment(TraineeAssessment t) {
        return traineeAssessmentRepository.save(t);
    }

    @Transactional
    public void deleteTraineeAssessment(Long id) {
        if (!traineeAssessmentRepository.existsById(id))
            throw new RuntimeException("Trainee Assessment not found");
        traineeAssessmentRepository.deleteById(id);
    }
}
