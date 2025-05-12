package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Evidence;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.EvidenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/evidence")
@RequiredArgsConstructor
public class EvidenceController {

    private final EvidenceService evidenceService;

    @PostMapping
    public ResponseEntity<Evidence> create(@RequestBody Evidence evidence) {
        return ResponseEntity.ok(evidenceService.createEvidence(evidence));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evidence> update(@PathVariable Long id, @RequestBody Evidence evidence) {
        return ResponseEntity.ok(evidenceService.updateEvidence(id, evidence));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        evidenceService.deleteEvidence(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Evidence>> getAll() {
        return ResponseEntity.ok(evidenceService.getAllEvidence());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Evidence> getById(@PathVariable Long id) {
        return evidenceService.getEvidenceById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/trainee-assessment/{traineeAssessmentId}")
    public ResponseEntity<List<Evidence>> getByTraineeAssessment(@PathVariable Long traineeAssessmentId) {
        return ResponseEntity.ok(evidenceService.getEvidenceByTraineeAssessmentId(traineeAssessmentId));
    }
}
