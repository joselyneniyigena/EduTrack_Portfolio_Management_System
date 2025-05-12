package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Sector;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.SectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sectors")
@RequiredArgsConstructor
public class SectorController {
    private final SectorService sectorService;

    @PostMapping
    public ResponseEntity<Sector> create(@RequestBody Sector sector) {
        return ResponseEntity.ok(sectorService.createSector(sector));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sector> update(@PathVariable Long id, @RequestBody Sector sector) {
        return ResponseEntity.ok(sectorService.updateSector(id, sector));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        sectorService.deleteSector(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Sector>> getAll() {
        return ResponseEntity.ok(sectorService.getAllSectors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sector> getById(@PathVariable Long id) {
        return sectorService.getSectorById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/rtqf-level/{rtqfLevelId}")
    public ResponseEntity<List<Sector>> getByRTQFLevel(@PathVariable Long rtqfLevelId) {
        return ResponseEntity.ok(sectorService.getSectorsByRTQFLevelId(rtqfLevelId));
    }
}
