package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.TrainerModule;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TrainerModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainer-modules")
@RequiredArgsConstructor
public class TrainerModuleController {

    private final TrainerModuleService trainerModuleService;

    @PostMapping
    public ResponseEntity<TrainerModule> create(@RequestBody TrainerModule trainerModule) {
        return ResponseEntity.ok(trainerModuleService.createTrainerModule(trainerModule));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrainerModule> update(@PathVariable Long id, @RequestBody TrainerModule trainerModule) {
        return ResponseEntity.ok(trainerModuleService.updateTrainerModule(id, trainerModule));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        trainerModuleService.deleteTrainerModule(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<TrainerModule>> getAll() {
        return ResponseEntity.ok(trainerModuleService.getAllTrainerModules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainerModule> getById(@PathVariable Long id) {
        return trainerModuleService.getTrainerModuleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/trainer/{trainerId}")
    public ResponseEntity<List<TrainerModule>> getByTrainer(@PathVariable Long trainerId) {
        return ResponseEntity.ok(trainerModuleService.getByTrainerId(trainerId));
    }

    @GetMapping("/trade-module/{tradeModuleId}")
    public ResponseEntity<List<TrainerModule>> getByTradeModule(@PathVariable Long tradeModuleId) {
        return ResponseEntity.ok(trainerModuleService.getByTradeModuleId(tradeModuleId));
    }
}
