package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Assessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TrainerModule;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.AssessmentRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.AssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssessmentServiceImpl implements AssessmentService {

    private final AssessmentRepository repository;
    @Override
    public Assessment save(Assessment assessment) {
        return repository.save(assessment);
    }

    @Override
    public Assessment findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Assessment> findByTrainerModule(TrainerModule trainerModule) {
        return repository.findByTrainerModule(trainerModule);
    }

    @Override
    public List<Assessment> findAll() {
        return repository.findAll();
    }

    @Override
    public Assessment update(Assessment assessment) {
        return repository.save(assessment);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
