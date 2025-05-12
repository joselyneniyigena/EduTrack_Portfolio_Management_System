package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Term;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TermService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/terms")
@RequiredArgsConstructor
public class TermController {

    private final TermService termService;

    @PostMapping
    public ResponseEntity<Term> create(@RequestBody Term term) {
        return ResponseEntity.ok(termService.createTerm(term));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Term> update(@PathVariable Long id, @RequestBody Term term) {
        return ResponseEntity.ok(termService.updateTerm(id, term));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        termService.deleteTerm(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Term>> getAll() {
        return ResponseEntity.ok(termService.getAllTerms());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Term> getById(@PathVariable Long id) {
        return termService.getTermById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/academic-year/{academicYearId}")
    public ResponseEntity<List<Term>> getByAcademicYear(@PathVariable Long academicYearId) {
        return ResponseEntity.ok(termService.getTermsByAcademicYearId(academicYearId));
    }

    @GetMapping("/current")
    public ResponseEntity<Term> getCurrentTerm() {
        return termService.getCurrentTerm()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
