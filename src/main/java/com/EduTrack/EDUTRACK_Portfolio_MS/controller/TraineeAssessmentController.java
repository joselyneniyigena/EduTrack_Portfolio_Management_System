package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineeAssessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TraineeAssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainee-assessments")
@RequiredArgsConstructor
public class TraineeAssessmentController {
    private final TraineeAssessmentService traineeAssessmentService;

    @PostMapping
    public ResponseEntity<TraineeAssessment> create(@RequestBody TraineeAssessment assessment) {
        return ResponseEntity.ok(traineeAssessmentService.createTraineeAssessment(assessment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TraineeAssessment> update(@PathVariable Long id, @RequestBody TraineeAssessment assessment) {
        return ResponseEntity.ok(traineeAssessmentService.updateTraineeAssessment(id, assessment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        traineeAssessmentService.deleteTraineeAssessment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<TraineeAssessment>> getAll() {
        return ResponseEntity.ok(traineeAssessmentService.getAllTraineeAssessments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TraineeAssessment> getById(@PathVariable Long id) {
        return traineeAssessmentService.getTraineeAssessmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/promotion/{promotionId}")
    public ResponseEntity<List<TraineeAssessment>> getByPromotion(@PathVariable Long promotionId) {
        return ResponseEntity.ok(traineeAssessmentService.getByTraineePromotionId(promotionId));
    }

    @GetMapping("/lua/{learningUnitAssessmentId}")
    public ResponseEntity<List<TraineeAssessment>> getByLua(@PathVariable Long learningUnitAssessmentId) {
        return ResponseEntity.ok(traineeAssessmentService.getByLearningUnitAssessmentId(learningUnitAssessmentId));
    }
}
