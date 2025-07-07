package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainer;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TrainerRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TrainerService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrainerServiceImpl implements TrainerService {

    private final TrainerRepository trainerRepository;

    @Override
    public Trainer createTrainer(Trainer trainer) {
        return trainerRepository.save(trainer);
    }

    @Override
    public Trainer updateTrainer(Long id, Trainer updatedTrainer) {
        Trainer existing = trainerRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trainer not found with ID: " + id));

        existing.setTrainerId(updatedTrainer.getTrainerId());
        existing.setFirstName(updatedTrainer.getFirstName());
        existing.setLastName(updatedTrainer.getLastName());
        existing.setDob(updatedTrainer.getDob());
        existing.setGender(updatedTrainer.getGender());
        existing.setMaritalStatus(updatedTrainer.getMaritalStatus());
        existing.setEmail(updatedTrainer.getEmail());
        existing.setPhoneNumber(updatedTrainer.getPhoneNumber());
        existing.setAddress(updatedTrainer.getAddress());

        return trainerRepository.save(existing);
    }

    @Override
    public void deleteTrainer(Long id) {
        trainerRepository.deleteById(id);
    }

    @Override
    public Optional<Trainer> getTrainerById(Long id) {
        return trainerRepository.findById(id);
    }

    @Override
    public Optional<Trainer> getTrainerByTrainerId(String trainerId) {
        return trainerRepository.findByTrainerId(trainerId);
    }

    @Override
    public List<Trainer> getAllTrainers() {
        return trainerRepository.findAll();
    }
}
