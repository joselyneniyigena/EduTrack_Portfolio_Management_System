package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainer;

import java.util.List;
import java.util.Optional;

public interface TrainerService {
    Trainer createTrainer(Trainer trainer);
    Trainer updateTrainer(Long id, Trainer updatedTrainer);
    void deleteTrainer(Long id);
    Optional<Trainer> getTrainerById(Long id);
    Optional<Trainer> getTrainerByTrainerId(String trainerId);
    List<Trainer> getAllTrainers();
}
