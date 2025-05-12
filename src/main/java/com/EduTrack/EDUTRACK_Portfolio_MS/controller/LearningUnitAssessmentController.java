package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnitAssessment;
import lombok.RequiredArgsConstructor;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.LearningUnitAssessmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/learning-unit-assessments")
@RequiredArgsConstructor
public class LearningUnitAssessmentController {

    private final LearningUnitAssessmentService luaService;

    @PostMapping
    public ResponseEntity<LearningUnitAssessment> create(@RequestBody LearningUnitAssessment lua) {
        return ResponseEntity.ok(luaService.create(lua));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LearningUnitAssessment> update(@PathVariable Long id, @RequestBody LearningUnitAssessment lua) {
        return ResponseEntity.ok(luaService.update(id, lua));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        luaService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<LearningUnitAssessment>> getAll() {
        return ResponseEntity.ok(luaService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<LearningUnitAssessment> getById(@PathVariable Long id) {
        return luaService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/assessment/{assessmentId}")
    public ResponseEntity<List<LearningUnitAssessment>> getByAssessment(@PathVariable Long assessmentId) {
        return ResponseEntity.ok(luaService.getByAssessmentId(assessmentId));
    }
}
