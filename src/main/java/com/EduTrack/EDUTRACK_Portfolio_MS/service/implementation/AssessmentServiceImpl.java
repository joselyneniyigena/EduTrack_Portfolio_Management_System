package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Assessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Term;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TrainerModule;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.AssessmentRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TermRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TrainerModuleRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.AssessmentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AssessmentServiceImpl implements AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final TermRepository termRepository;
    private final TrainerModuleRepository trainerModuleRepository;
    @Override
    public Assessment createAssessment(Assessment assessment) {
        return assessmentRepository.save(assessment);
    }

    @Override
    public Assessment updateAssessment(Long id, Assessment updatedAssessment) {
        Assessment existing = assessmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Assessment not found with ID: " + id));

        existing.setType(updatedAssessment.getType());
        existing.setCategory(updatedAssessment.getCategory());
        existing.setLocation(updatedAssessment.getLocation());
        existing.setDateTime(updatedAssessment.getDateTime());

        // Optional safety checks
        if (updatedAssessment.getTerm() != null) {
            Term term = termRepository.findById(updatedAssessment.getTerm().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Term not found"));
            existing.setTerm(term);
        }

        if (updatedAssessment.getTrainerModule() != null) {
            TrainerModule trainerModule = trainerModuleRepository.findById(updatedAssessment.getTrainerModule().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Trainer Module not found"));
            existing.setTrainerModule(trainerModule);
        }

        return assessmentRepository.save(existing);
    }

    @Override
    public void deleteAssessment(Long id) {
        assessmentRepository.deleteById(id);
    }

    @Override
    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }

    @Override
    public Optional<Assessment> getAssessmentById(Long id) {
        return assessmentRepository.findById(id);
    }

    @Override
    public List<Assessment> getAssessmentsByTermId(Long termId) {
        Term term = termRepository.findById(termId)
                .orElseThrow(() -> new EntityNotFoundException("Term not found"));
        return assessmentRepository.findByTerm(term);
    }

    @Override
    public List<Assessment> getAssessmentsByTrainerModuleId(Long trainerModuleId) {
        TrainerModule tm = trainerModuleRepository.findById(trainerModuleId)
                .orElseThrow(() -> new EntityNotFoundException("Trainer Module not found"));
        return assessmentRepository.findByTrainerModule(tm);
    }
}
