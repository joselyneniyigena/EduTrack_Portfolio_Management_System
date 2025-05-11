package com.EduTrack.EDUTRACK_Portfolio_MS.service;


import com.EduTrack.EDUTRACK_Portfolio_MS.dto.MapperUtil;
import com.EduTrack.EDUTRACK_Portfolio_MS.dto.TraineeDTO;
import com.EduTrack.EDUTRACK_Portfolio_MS.dto.TrainerDTO;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainee;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainer;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TraineeRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TrainerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainerTraineeService {

    private final TrainerRepository trainerRepository;
    private final TraineeRepository traineeRepository;

    // TRAINER SERVICES
    public List<TrainerDTO> getAllTrainers() {
        return trainerRepository.findAll().stream()
                .map(MapperUtil::toDto)
                .collect(Collectors.toList());
    }

    public TrainerDTO getTrainerById(Long id) {
        return trainerRepository.findById(id)
                .map(MapperUtil::toDto)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));
    }

    @Transactional
    public TrainerDTO createTrainer(TrainerDTO dto) {
        Trainer trainer = MapperUtil.toEntity(dto);
        return MapperUtil.toDto(trainerRepository.save(trainer));
    }

    @Transactional
    public TrainerDTO updateTrainer(Long id, TrainerDTO dto) {
        Trainer trainer = trainerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

        trainer.setTrainerId(dto.getTrainerId());
        trainer.setFirstName(dto.getFirstName());
        trainer.setLastName(dto.getLastName());
        trainer.setDob(dto.getDob());
        trainer.setGender(dto.getGender());
        trainer.setMaritalStatus(dto.getMaritalStatus());
        trainer.setEmail(dto.getEmail());
        trainer.setPhoneNbr(dto.getPhoneNbr());
        trainer.setAddress(dto.getAddress());

        return MapperUtil.toDto(trainerRepository.save(trainer));
    }

    @Transactional
    public void deleteTrainer(Long id) {
        if (!trainerRepository.existsById(id)) {
            throw new RuntimeException("Trainer not found");
        }
        trainerRepository.deleteById(id);
    }

    // TRAINEE SERVICES
    public List<TraineeDTO> getAllTrainees() {
        return traineeRepository.findAll().stream()
                .map(MapperUtil::toDto)
                .collect(Collectors.toList());
    }

    public TraineeDTO getTraineeById(Long id) {
        return traineeRepository.findById(id)
                .map(MapperUtil::toDto)
                .orElseThrow(() -> new RuntimeException("Trainee not found"));
    }

    @Transactional
    public TraineeDTO createTrainee(TraineeDTO dto) {
        Trainee trainee = MapperUtil.toEntity(dto);
        return MapperUtil.toDto(traineeRepository.save(trainee));
    }

    @Transactional
    public TraineeDTO updateTrainee(Long id, TraineeDTO dto) {
        Trainee trainee = traineeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Trainee not found"));

        trainee.setTraineeId(dto.getTraineeId());
        trainee.setFirstName(dto.getFirstName());
        trainee.setLastName(dto.getLastName());
        trainee.setDob(dto.getDob());
        trainee.setGender(dto.getGender());
        trainee.setMaritalStatus(dto.getMaritalStatus());
        trainee.setEmail(dto.getEmail());
        trainee.setPhoneNbr(dto.getPhoneNbr());
        trainee.setAddress(dto.getAddress());

        return MapperUtil.toDto(traineeRepository.save(trainee));
    }

    @Transactional
    public void deleteTrainee(Long id) {
        if (!traineeRepository.existsById(id)) {
            throw new RuntimeException("Trainee not found");
        }
        traineeRepository.deleteById(id);
    }
}