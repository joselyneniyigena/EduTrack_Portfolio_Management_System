package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainer;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TrainerModule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrainerModuleRepository extends JpaRepository<TrainerModule, Long> {
    List<TrainerModule> findByTrainer(Trainer trainer);
}
