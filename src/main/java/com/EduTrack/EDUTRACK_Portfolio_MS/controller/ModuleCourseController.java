package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.ModuleCourse;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.ModuleCourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/module-courses")
@RequiredArgsConstructor
public class ModuleCourseController {

    private final ModuleCourseService moduleCourseService;

    @PostMapping
    public ResponseEntity<ModuleCourse> create(@RequestBody ModuleCourse module) {
        return ResponseEntity.ok(moduleCourseService.createModuleCourse(module));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ModuleCourse> update(@PathVariable Long id, @RequestBody ModuleCourse module) {
        return ResponseEntity.ok(moduleCourseService.updateModuleCourse(id, module));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        moduleCourseService.deleteModuleCourse(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ModuleCourse>> getAll() {
        return ResponseEntity.ok(moduleCourseService.getAllModuleCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ModuleCourse> getById(@PathVariable Long id) {
        return moduleCourseService.getModuleCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<ModuleCourse>> getByType(@PathVariable ModuleCourse.ModuleType type) {
        return ResponseEntity.ok(moduleCourseService.getModuleCoursesByType(type));
    }
}
