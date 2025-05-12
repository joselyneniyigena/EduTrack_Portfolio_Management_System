package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Assessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Term;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TrainerModule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    List<Assessment> findByTerm(Term term);
    List<Assessment> findByTrainerModule(TrainerModule trainerModule);
}
