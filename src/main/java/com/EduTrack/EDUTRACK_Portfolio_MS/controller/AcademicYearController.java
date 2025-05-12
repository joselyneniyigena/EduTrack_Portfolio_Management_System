package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.AcademicYear;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.AcademicYearService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/academic-years")
@RequiredArgsConstructor
public class AcademicYearController {
    private final AcademicYearService academicYearService;

    @PostMapping
    public ResponseEntity<AcademicYear> createAcademicYear(@RequestBody AcademicYear academicYear) {
        AcademicYear created = academicYearService.createAcademicYear(academicYear);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AcademicYear> updateAcademicYear(@PathVariable Long id, @RequestBody AcademicYear academicYear) {
        AcademicYear updated = academicYearService.updateAcademicYear(id, academicYear);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAcademicYear(@PathVariable Long id) {
        academicYearService.deleteAcademicYear(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<AcademicYear>> getAllAcademicYears() {
        return ResponseEntity.ok(academicYearService.getAllAcademicYears());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AcademicYear> getAcademicYearById(@PathVariable Long id) {
        return academicYearService.getAcademicYearById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/current")
    public ResponseEntity<AcademicYear> getCurrentAcademicYear() {
        return academicYearService.getCurrentAcademicYear()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
