package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainee;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TraineeService;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TraineeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TraineeServiceImpl implements TraineeService {

    private final TraineeRepository repository;
    @Override
    public Trainee save(Trainee trainee) {
        return repository.save(trainee);
    }

    @Override
    public Trainee findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Optional<Trainee> findByTraineeId(String traineeId) {
        return repository.findByTraineeId(traineeId);
    }

    @Override
    public List<Trainee> findAll() {
        return repository.findAll();
    }

    @Override
    public Trainee update(Trainee trainee) {
        return repository.save(trainee);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
