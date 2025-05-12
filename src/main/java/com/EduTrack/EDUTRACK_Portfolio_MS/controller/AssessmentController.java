package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Assessment;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.AssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor

public class AssessmentController {

    private final AssessmentService assessmentService;

    @PostMapping
    public ResponseEntity<Assessment> create(@RequestBody Assessment assessment) {
        return ResponseEntity.ok(assessmentService.createAssessment(assessment));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Assessment> update(@PathVariable Long id, @RequestBody Assessment assessment) {
        return ResponseEntity.ok(assessmentService.updateAssessment(id, assessment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        assessmentService.deleteAssessment(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Assessment>> getAll() {
        return ResponseEntity.ok(assessmentService.getAllAssessments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assessment> getById(@PathVariable Long id) {
        return assessmentService.getAssessmentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/term/{termId}")
    public ResponseEntity<List<Assessment>> getByTerm(@PathVariable Long termId) {
        return ResponseEntity.ok(assessmentService.getAssessmentsByTermId(termId));
    }

    @GetMapping("/trainer-module/{trainerModuleId}")
    public ResponseEntity<List<Assessment>> getByTrainerModule(@PathVariable Long trainerModuleId) {
        return ResponseEntity.ok(assessmentService.getAssessmentsByTrainerModuleId(trainerModuleId));
    }
}
