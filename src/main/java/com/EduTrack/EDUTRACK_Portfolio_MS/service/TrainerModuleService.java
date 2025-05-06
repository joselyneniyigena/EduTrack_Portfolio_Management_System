package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainer;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TrainerModule;

import java.util.List;

public interface TrainerModuleService {
    TrainerModule save(TrainerModule trainerModule);
    TrainerModule findById(Long id);
    List<TrainerModule> findByTrainer(Trainer trainer);
    List<TrainerModule> findAll();
    TrainerModule update(TrainerModule trainerModule);
    void deleteById(Long id);
}
