package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainer;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TrainerRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TrainerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrainerServiceImpl implements TrainerService {

    private final TrainerRepository repository;
    @Override
    public Trainer save(Trainer trainer) {
        return repository.save(trainer);
    }

    @Override
    public Trainer findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Trainer> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Trainer> findByTrainerId(String trainerId) {
        return repository.findByTrainerId(trainerId);
    }

    @Override
    public Trainer update(Trainer trainer) {

        return repository.save(trainer);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
