package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Term;

import java.util.List;
import java.util.Optional;

public interface TermService {
    Term createTerm(Term term);
    Term updateTerm(Long id, Term updatedTerm);
    void deleteTerm(Long id);
    Optional<Term> getTermById(Long id);
    List<Term> getAllTerms();
    List<Term> getTermsByAcademicYearId(Long academicYearId);
    Optional<Term> getCurrentTerm();

}
