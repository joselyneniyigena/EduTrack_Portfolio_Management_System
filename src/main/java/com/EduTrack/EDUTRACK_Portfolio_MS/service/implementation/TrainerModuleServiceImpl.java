package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainer;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TrainerModule;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TrainerModuleRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TrainerModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainerModuleServiceImpl implements TrainerModuleService {

    private final TrainerModuleRepository repository;
    @Override
    public TrainerModule save(TrainerModule trainerModule) {
        return repository.save(trainerModule);
    }

    @Override
    public TrainerModule findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<TrainerModule> findByTrainer(Trainer trainer) {
        return repository.findByTrainer(trainer);
    }

    @Override
    public List<TrainerModule> findAll() {
        return repository.findAll();
    }

    @Override
    public TrainerModule update(TrainerModule trainerModule) {
        return repository.save(trainerModule);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
