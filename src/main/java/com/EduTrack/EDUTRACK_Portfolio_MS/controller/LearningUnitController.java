package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnit;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.LearningUnitService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning-units")
@RequiredArgsConstructor
public class LearningUnitController {

    private final LearningUnitService learningUnitService;

    @PostMapping
    public ResponseEntity<LearningUnit> create(@RequestBody LearningUnit unit) {
        return ResponseEntity.ok(learningUnitService.createLearningUnit(unit));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningUnit> update(@PathVariable Long id, @RequestBody LearningUnit unit) {
        return ResponseEntity.ok(learningUnitService.updateLearningUnit(id, unit));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        learningUnitService.deleteLearningUnit(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<LearningUnit>> getAll() {
        return ResponseEntity.ok(learningUnitService.getAllLearningUnits());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningUnit> getById(@PathVariable Long id) {
        return learningUnitService.getLearningUnitById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/module/{moduleCourseId}")
    public ResponseEntity<List<LearningUnit>> getByModuleCourse(@PathVariable Long moduleCourseId) {
        return ResponseEntity.ok(learningUnitService.getLearningUnitsByModuleCourseId(moduleCourseId));
    }
}
