package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainee;

import java.util.List;
import java.util.Optional;

public interface TraineeService {
    Trainee createTrainee(Trainee trainee);
    Trainee updateTrainee(Long id, Trainee updatedTrainee);
    void deleteTrainee(Long id);
    Optional<Trainee> getTraineeById(Long id);
    Optional<Trainee> getTraineeByTraineeId(String traineeId);
    List<Trainee> getAllTrainees();
}
