package com.EduTrack.EDUTRACK_Portfolio_MS.controller;


import com.EduTrack.EDUTRACK_Portfolio_MS.dto.AssessmentDTO;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.GeneralEntityServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
public class AssessmentController {

    private final GeneralEntityServices service;

    @GetMapping
    public List<AssessmentDTO> getAllAssessments() {
        return service.getAllAssessments();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssessmentDTO> getAssessmentById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getAssessmentById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssessment(@PathVariable Long id) {
        service.deleteAssessment(id);
        return ResponseEntity.noContent().build();
    }
}
