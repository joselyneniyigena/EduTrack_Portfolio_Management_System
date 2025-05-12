package com.EduTrack.EDUTRACK_Portfolio_MS.controller;


import com.EduTrack.EDUTRACK_Portfolio_MS.model.SchoolProfile;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.SchoolProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/school-profiles")
@RequiredArgsConstructor
public class SchoolProfileController {

    private final SchoolProfileService schoolProfileService;

    @PostMapping
    public ResponseEntity<SchoolProfile> create(@RequestBody SchoolProfile profile) {
        return ResponseEntity.ok(schoolProfileService.createProfile(profile));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SchoolProfile> update(@PathVariable Long id, @RequestBody SchoolProfile profile) {
        return ResponseEntity.ok(schoolProfileService.updateProfile(id, profile));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        schoolProfileService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<SchoolProfile>> getAll() {
        return ResponseEntity.ok(schoolProfileService.getAllProfiles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SchoolProfile> getById(@PathVariable Long id) {
        return schoolProfileService.getProfileById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
