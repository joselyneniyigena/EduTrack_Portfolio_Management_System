package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.RTQFLevel;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.RTQFLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rtqf-levels")
@RequiredArgsConstructor
public class RTQFLevelController {

    private final RTQFLevelService rtqfLevelService;

    @PostMapping
    public ResponseEntity<RTQFLevel> create(@RequestBody RTQFLevel level) {
        return ResponseEntity.ok(rtqfLevelService.createLevel(level));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RTQFLevel> update(@PathVariable Long id, @RequestBody RTQFLevel level) {
        return ResponseEntity.ok(rtqfLevelService.updateLevel(id, level));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        rtqfLevelService.deleteLevel(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<RTQFLevel>> getAll() {
        return ResponseEntity.ok(rtqfLevelService.getAllLevels());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RTQFLevel> getById(@PathVariable Long id) {
        return rtqfLevelService.getLevelById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
