package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Evidence;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineeAssessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.EvidenceRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TraineeAssessmentRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.EvidenceService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EvidenceServiceImpl implements EvidenceService {


    private final EvidenceRepository evidenceRepository;
    private final TraineeAssessmentRepository traineeAssessmentRepository;
    @Override
    public Evidence createEvidence(Evidence evidence) {
        return evidenceRepository.save(evidence);
    }

    @Override
    public Evidence updateEvidence(Long id, Evidence updatedEvidence) {
        Evidence existing = evidenceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Evidence not found with ID: " + id));

        existing.setName(updatedEvidence.getName());
        existing.setType(updatedEvidence.getType());
        existing.setContent(updatedEvidence.getContent());

        if (updatedEvidence.getTraineeAssessment() != null) {
            TraineeAssessment ta = traineeAssessmentRepository.findById(updatedEvidence.getTraineeAssessment().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Trainee Assessment not found"));
            existing.setTraineeAssessment(ta);
        }

        return evidenceRepository.save(existing);
    }

    @Override
    public void deleteEvidence(Long id) {
        evidenceRepository.deleteById(id);
    }

    @Override
    public Optional<Evidence> getEvidenceById(Long id) {
        return evidenceRepository.findById(id);
    }

    @Override
    public List<Evidence> getAllEvidence() {
        return evidenceRepository.findAll();
    }

    @Override
    public List<Evidence> getEvidenceByTraineeAssessmentId(Long traineeAssessmentId) {
        TraineeAssessment ta = traineeAssessmentRepository.findById(traineeAssessmentId)
                .orElseThrow(() -> new EntityNotFoundException("Trainee Assessment not found"));
        return evidenceRepository.findByTraineeAssessment(ta);
    }
}
