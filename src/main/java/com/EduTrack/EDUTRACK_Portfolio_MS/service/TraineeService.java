package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.dto.TraineeProfileDTO;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainee;

import java.util.List;
import java.util.Optional;

public interface TraineeService {
    Trainee createTrainee(TraineeProfileDTO trainee) throws Exception;
    Trainee updateTrainee(Long id, TraineeProfileDTO updatedTrainee);
    void deleteTrainee(Long id);
    Optional<TraineeProfileDTO> getTraineeById(Long id);
    Optional<TraineeProfileDTO> getTraineeByTraineeId(String traineeId);
    List<TraineeProfileDTO> getAllTrainees();

    Long countTrainees();
}
