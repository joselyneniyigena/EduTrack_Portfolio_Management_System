package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Assessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnitAssessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.AssessmentRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.LearningUnitAssessmentRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.LearningUnitAssessmentService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LearningUnitAssessmentServiceImpl implements LearningUnitAssessmentService {

    private final LearningUnitAssessmentRepository luaRepository;
    private final AssessmentRepository assessmentRepository;
    @Override
    public LearningUnitAssessment create(LearningUnitAssessment lua) {
        return luaRepository.save(lua);
    }

    @Override
    public LearningUnitAssessment update(Long id, LearningUnitAssessment updated) {
        LearningUnitAssessment existing = luaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Learning Unit Assessment not found with ID: " + id));

        existing.setStatus(updated.getStatus());

        if (updated.getAssessment() != null) {
            Assessment assessment = assessmentRepository.findById(updated.getAssessment().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Assessment not found"));
            existing.setAssessment(assessment);
        }

        return luaRepository.save(existing);
    }

    @Override
    public void delete(Long id) {
        luaRepository.deleteById(id);
    }

    @Override
    public Optional<LearningUnitAssessment> getById(Long id) {
        return luaRepository.findById(id);
    }

    @Override
    public List<LearningUnitAssessment> getAll() {
        return luaRepository.findAll();
    }

    @Override
    public List<LearningUnitAssessment> getByAssessmentId(Long assessmentId) {
        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new EntityNotFoundException("Assessment not found"));
        return luaRepository.findByAssessment(assessment);
    }
}
