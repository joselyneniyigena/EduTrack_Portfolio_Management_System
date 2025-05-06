package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Term;

import java.util.List;

public interface TermService {
    Term save(Term term);
    Term findById(Long id);
    List<Term> findAll();
    Term update(Term term);
    void deleteById(Long id);
}
