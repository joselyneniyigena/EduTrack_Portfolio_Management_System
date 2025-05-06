package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainee;

import java.util.List;
import java.util.Optional;

public interface TraineeService {
    Trainee save(Trainee trainee);
    Trainee findById(Long id);
    Optional<Trainee> findByTraineeId(String traineeId);
    List<Trainee> findAll();
    Trainee update(Trainee trainee);
    void deleteById(Long id);
}
