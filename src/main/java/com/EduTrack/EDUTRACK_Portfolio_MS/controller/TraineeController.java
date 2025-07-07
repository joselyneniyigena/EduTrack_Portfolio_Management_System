package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.dto.TraineeProfileDTO;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trainee;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TraineeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainees")
@RequiredArgsConstructor

public class TraineeController {

    private final TraineeService traineeService;

    @PostMapping
    public ResponseEntity<Trainee> create(@RequestBody TraineeProfileDTO trainee) throws Exception {
        return ResponseEntity.ok(traineeService.createTrainee(trainee));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Trainee> update(@PathVariable Long id, @RequestBody TraineeProfileDTO trainee) {
        return ResponseEntity.ok(traineeService.updateTrainee(id, trainee));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        traineeService.deleteTrainee(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<TraineeProfileDTO>> getAll() {
        return ResponseEntity.ok(traineeService.getAllTrainees());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TraineeProfileDTO> getById(@PathVariable Long id) {
        return traineeService.getTraineeById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/trainee-id/{traineeId}")
    public ResponseEntity<TraineeProfileDTO> getByTraineeId(@PathVariable String traineeId) {
        return traineeService.getTraineeByTraineeId(traineeId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/count")
    public ResponseEntity<Long> getTraineeCount() {
        return ResponseEntity.ok(traineeService.countTrainees());
    }
}
