package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.AcademicYear;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainee;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineePromotion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TraineePromotionRepository extends JpaRepository<TraineePromotion, Long> {
    List<TraineePromotion> findByTrainee(Trainee trainee);

    Optional<TraineePromotion> findByTrainee_IdAndTerm_AcademicYear_Status(Long traineeId, AcademicYear.AcademicYearStatus termAcademicYearStatus);


}
