package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainer;

import java.util.List;
import java.util.Optional;

public interface TrainerService {
    Trainer save(Trainer trainer);
    Trainer findById(Long id);
    List<Trainer> findAll();
    Optional<Trainer> findByTrainerId(String trainerId);
    Trainer update(Trainer trainer);
    void deleteById(Long id);
}
