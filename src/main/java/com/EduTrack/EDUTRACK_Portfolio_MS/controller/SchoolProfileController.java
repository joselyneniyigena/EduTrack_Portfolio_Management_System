package com.EduTrack.EDUTRACK_Portfolio_MS.controller;


import com.EduTrack.EDUTRACK_Portfolio_MS.dto.SchoolProfileDTO;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.GeneralEntityServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/schools")
@RequiredArgsConstructor
public class SchoolProfileController {

    private final GeneralEntityServices service;

    @GetMapping
    public List<SchoolProfileDTO> getAllSchools() {
        return service.getAllSchools();
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchoolProfileDTO> getSchoolById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getSchoolById(id));
    }

    @PostMapping
    public ResponseEntity<SchoolProfileDTO> createSchool(@RequestBody SchoolProfileDTO dto) {
        return ResponseEntity.ok(service.createSchool(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SchoolProfileDTO> updateSchool(@PathVariable Long id, @RequestBody SchoolProfileDTO dto) {
        return ResponseEntity.ok(service.updateSchool(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSchool(@PathVariable Long id) {
        service.deleteSchool(id);
        return ResponseEntity.noContent().build();
    }
}
