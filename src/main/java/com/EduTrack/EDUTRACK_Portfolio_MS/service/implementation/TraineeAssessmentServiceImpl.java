package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineeAssessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TraineeAssessmentRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TraineeAssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class TraineeAssessmentServiceImpl implements TraineeAssessmentService {

    private final TraineeAssessmentRepository repository;

    @Override
    public TraineeAssessment save(TraineeAssessment ta) {
        return repository.save(ta);
    }

    @Override
    public TraineeAssessment findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<TraineeAssessment> findAll() {
        return  repository.findAll();
    }

    @Override
    public TraineeAssessment update(TraineeAssessment ta) {
        return repository.save(ta);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
