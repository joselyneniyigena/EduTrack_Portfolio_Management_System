package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.AcademicYear;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Term;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TermRepository extends JpaRepository<Term, Long> {
    List<Term> findByAcademicYear(AcademicYear academicYear);
    Optional<Term> findByAcademicYearAndStatus(AcademicYear academicYear, String status);
    Optional<Term> findByStartDateBeforeAndEndDateAfter(LocalDate start, LocalDate end);
}
