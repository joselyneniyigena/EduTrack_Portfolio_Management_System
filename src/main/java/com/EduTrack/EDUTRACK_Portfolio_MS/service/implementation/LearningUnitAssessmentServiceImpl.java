package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnitAssessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.LearningUnitAssessmentRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.LearningUnitAssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningUnitAssessmentServiceImpl implements LearningUnitAssessmentService {

    private final LearningUnitAssessmentRepository repository;

    @Override
    public LearningUnitAssessment save(LearningUnitAssessment lua) {
        return repository.save(lua);
    }

    @Override
    public LearningUnitAssessment findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<LearningUnitAssessment> findAll() {
        return repository.findAll();
    }

    @Override
    public LearningUnitAssessment update(LearningUnitAssessment lua) {
        return repository.save(lua);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
