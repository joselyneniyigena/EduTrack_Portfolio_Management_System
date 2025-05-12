package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.AcademicYear;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Term;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.AcademicYearRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TermRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TermService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TermServiceImpl implements TermService {

    private final TermRepository termRepository;
    private final AcademicYearRepository academicYearRepository;

    @Override
    public Term createTerm(Term term) {
        return termRepository.save(term);
    }

    @Override
    public Term updateTerm(Long id, Term updatedTerm) {
        Term existing = termRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Term not found with ID: " + id));

        existing.setStartDate(updatedTerm.getStartDate());
        existing.setEndDate(updatedTerm.getEndDate());
        existing.setStatus(updatedTerm.getStatus());

        if (updatedTerm.getAcademicYear() != null) {
            AcademicYear ay = academicYearRepository.findById(updatedTerm.getAcademicYear().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Academic Year not found"));
            existing.setAcademicYear(ay);
        }

        return termRepository.save(existing);
    }

    @Override
    public void deleteTerm(Long id) {
        termRepository.deleteById(id);
    }

    @Override
    public Optional<Term> getTermById(Long id) {
        return termRepository.findById(id);
    }

    @Override
    public List<Term> getAllTerms() {
        return termRepository.findAll();
    }

    @Override
    public List<Term> getTermsByAcademicYearId(Long academicYearId) {
        AcademicYear ay = academicYearRepository.findById(academicYearId)
                .orElseThrow(() -> new EntityNotFoundException("Academic Year not found"));
        return termRepository.findByAcademicYear(ay);
    }

    @Override
    public Optional<Term> getCurrentTerm() {
        LocalDate today = LocalDate.now();
        return termRepository.findByStartDateBeforeAndEndDateAfter(today, today);
    }
}
