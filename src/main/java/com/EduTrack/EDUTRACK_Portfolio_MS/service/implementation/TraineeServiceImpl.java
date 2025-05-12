package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainee;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TraineeRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TraineeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TraineeServiceImpl implements TraineeService {

    private final TraineeRepository traineeRepository;
    @Override
    public Trainee createTrainee(Trainee trainee) {
        return traineeRepository.save(trainee);
    }

    @Override
    public Trainee updateTrainee(Long id, Trainee updatedTrainee) {
        Trainee existing = traineeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trainee not found with ID: " + id));

        existing.setTraineeId(updatedTrainee.getTraineeId());
        existing.setFirstName(updatedTrainee.getFirstName());
        existing.setLastName(updatedTrainee.getLastName());
        existing.setDob(updatedTrainee.getDob());
        existing.setGender(updatedTrainee.getGender());
        existing.setMaritalStatus(updatedTrainee.getMaritalStatus());
        existing.setEmail(updatedTrainee.getEmail());
        existing.setPhoneNbr(updatedTrainee.getPhoneNbr());
        existing.setAddress(updatedTrainee.getAddress());

        return traineeRepository.save(existing);
    }

    @Override
    public void deleteTrainee(Long id) {
        traineeRepository.deleteById(id);
    }

    @Override
    public Optional<Trainee> getTraineeById(Long id) {
        return traineeRepository.findById(id);
    }

    @Override
    public Optional<Trainee> getTraineeByTraineeId(String traineeId) {
        return traineeRepository.findByTraineeId(traineeId);
    }

    @Override
    public List<Trainee> getAllTrainees() {
        return traineeRepository.findAll();
    }
}
