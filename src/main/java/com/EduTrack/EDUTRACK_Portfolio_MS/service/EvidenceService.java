package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Evidence;

import java.util.List;
import java.util.Optional;

public interface EvidenceService {
    Evidence createEvidence(Evidence evidence);
    Evidence updateEvidence(Long id, Evidence updatedEvidence);
    void deleteEvidence(Long id);
    Optional<Evidence> getEvidenceById(Long id);
    List<Evidence> getAllEvidence();
    List<Evidence> getEvidenceByTraineeAssessmentId(Long traineeAssessmentId);
}
