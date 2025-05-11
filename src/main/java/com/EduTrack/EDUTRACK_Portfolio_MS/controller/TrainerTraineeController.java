package com.EduTrack.EDUTRACK_Portfolio_MS.controller;


import com.EduTrack.EDUTRACK_Portfolio_MS.dto.TraineeDTO;
import com.EduTrack.EDUTRACK_Portfolio_MS.dto.TrainerDTO;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TrainerTraineeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class TrainerTraineeController {

    private final TrainerTraineeService service;

    // TRAINER ENDPOINTS
    @GetMapping("/trainers")
    public List<TrainerDTO> getAllTrainers() {
        return service.getAllTrainers();
    }

    @GetMapping("/trainers/{id}")
    public ResponseEntity<TrainerDTO> getTrainerById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getTrainerById(id));
    }

    @PostMapping("/trainers")
    public ResponseEntity<TrainerDTO> createTrainer(@RequestBody TrainerDTO dto) {
        return ResponseEntity.ok(service.createTrainer(dto));
    }

    @PutMapping("/trainers/{id}")
    public ResponseEntity<TrainerDTO> updateTrainer(@PathVariable Long id, @RequestBody TrainerDTO dto) {
        return ResponseEntity.ok(service.updateTrainer(id, dto));
    }

    @DeleteMapping("/trainers/{id}")
    public ResponseEntity<Void> deleteTrainer(@PathVariable Long id) {
        service.deleteTrainer(id);
        return ResponseEntity.noContent().build();
    }

    // TRAINEE ENDPOINTS
    @GetMapping("/trainees")
    public List<TraineeDTO> getAllTrainees() {
        return service.getAllTrainees();
    }

    @GetMapping("/trainees/{id}")
    public ResponseEntity<TraineeDTO> getTraineeById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getTraineeById(id));
    }

    @PostMapping("/trainees")
    public ResponseEntity<TraineeDTO> createTrainee(@RequestBody TraineeDTO dto) {
        return ResponseEntity.ok(service.createTrainee(dto));
    }

    @PutMapping("/trainees/{id}")
    public ResponseEntity<TraineeDTO> updateTrainee(@PathVariable Long id, @RequestBody TraineeDTO dto) {
        return ResponseEntity.ok(service.updateTrainee(id, dto));
    }

    @DeleteMapping("/trainees/{id}")
    public ResponseEntity<Void> deleteTrainee(@PathVariable Long id) {
        service.deleteTrainee(id);
        return ResponseEntity.noContent().build();
    }
}
