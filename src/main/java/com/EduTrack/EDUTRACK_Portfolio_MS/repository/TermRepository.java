package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.AcademicYear;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Term;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TermRepository extends JpaRepository<Term, Long> {
    List<Term> findByAcademicYear(AcademicYear academicYear);
}
