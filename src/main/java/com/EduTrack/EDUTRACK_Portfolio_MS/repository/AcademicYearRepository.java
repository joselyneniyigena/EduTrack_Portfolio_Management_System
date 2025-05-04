package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.AcademicYear;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AcademicYearRepository extends JpaRepository<AcademicYear, Long> {
    Optional<AcademicYear> findByYear(String year);
}
