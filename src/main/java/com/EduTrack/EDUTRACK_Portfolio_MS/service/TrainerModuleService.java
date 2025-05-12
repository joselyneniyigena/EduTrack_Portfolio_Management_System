package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.TrainerModule;

import java.util.List;
import java.util.Optional;

public interface TrainerModuleService {
    TrainerModule createTrainerModule(TrainerModule trainerModule);
    TrainerModule updateTrainerModule(Long id, TrainerModule updated);
    void deleteTrainerModule(Long id);
    Optional<TrainerModule> getTrainerModuleById(Long id);
    List<TrainerModule> getAllTrainerModules();
    List<TrainerModule> getByTrainerId(Long trainerId);
    List<TrainerModule> getByTradeModuleId(Long tradeModuleId);
}
