package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Evidence;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineeAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EvidenceRepository extends JpaRepository<Evidence, Long> {
    List<Evidence> findByTraineeAssessment(TraineeAssessment assessment);
}
