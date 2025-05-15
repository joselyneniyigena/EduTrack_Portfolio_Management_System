package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.TradeModule;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainer;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TrainerModule;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TradeModuleRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TrainerModuleRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TrainerRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TrainerModuleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrainerModuleServiceImpl implements TrainerModuleService {

    private final TrainerModuleRepository trainerModuleRepository;
    private final TrainerRepository trainerRepository;
    private final TradeModuleRepository tradeModuleRepository;

    @Override
    public TrainerModule createTrainerModule(TrainerModule trainerModule) {
        return trainerModuleRepository.save(trainerModule);
    }

    @Override
    public TrainerModule updateTrainerModule(Long id, TrainerModule updated) {
        TrainerModule existing = trainerModuleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TrainerModule not found with ID: " + id));

        if (updated.getTrainer() != null) {
            Trainer trainer = trainerRepository.findById(updated.getTrainer().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Trainer not found"));
            existing.setTrainer(trainer);
        }

        if (updated.getTradeModule() != null) {
            TradeModule tradeModule = tradeModuleRepository.findById(updated.getTradeModule().getId())
                    .orElseThrow(() -> new EntityNotFoundException("TradeModule not found"));
            existing.setTradeModule(tradeModule);
        }

        return trainerModuleRepository.save(existing);
    }

    @Override
    public void deleteTrainerModule(Long id) {
        trainerModuleRepository.deleteById(id);
    }

    @Override
    public Optional<TrainerModule> getTrainerModuleById(Long id) {
        return trainerModuleRepository.findById(id);
    }

    @Override
    public List<TrainerModule> getAllTrainerModules() {
        return trainerModuleRepository.findAll();
    }

    @Override
    public List<TrainerModule> getByTrainerId(Long trainerId) {
        Trainer trainer = trainerRepository.findById(trainerId)
                .orElseThrow(() -> new EntityNotFoundException("Trainer not found"));
        return trainerModuleRepository.findByTrainer(trainer);
    }

    @Override
    public List<TrainerModule> getByTradeModuleId(Long tradeModuleId) {
        TradeModule tradeModule = tradeModuleRepository.findById(tradeModuleId)
                .orElseThrow(() -> new EntityNotFoundException("TradeModule not found"));
        return trainerModuleRepository.findByTradeModule(tradeModule);
    }
}
