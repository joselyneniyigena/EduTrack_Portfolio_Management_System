package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.TraineePromotion;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TraineePromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trainee-promotions")
@RequiredArgsConstructor
public class TraineePromotionController {
    private final TraineePromotionService traineePromotionService;

    @PostMapping
    public ResponseEntity<TraineePromotion> create(@RequestBody TraineePromotion promotion) {
        return ResponseEntity.ok(traineePromotionService.createPromotion(promotion));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TraineePromotion> update(@PathVariable Long id, @RequestBody TraineePromotion promotion) {
        return ResponseEntity.ok(traineePromotionService.updatePromotion(id, promotion));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        traineePromotionService.deletePromotion(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<TraineePromotion>> getAll() {
        return ResponseEntity.ok(traineePromotionService.getAllPromotions());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TraineePromotion> getById(@PathVariable Long id) {
        return traineePromotionService.getPromotionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/trainee/{traineeId}")
    public ResponseEntity<List<TraineePromotion>> getByTrainee(@PathVariable Long traineeId) {
        return ResponseEntity.ok(traineePromotionService.getPromotionsByTraineeId(traineeId));
    }
}
