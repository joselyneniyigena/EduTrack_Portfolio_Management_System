package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.TradeModule;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TradeModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trade-modules")
@RequiredArgsConstructor
public class TradeModuleController {

    private final TradeModuleService tradeModuleService;

    @PostMapping
    public ResponseEntity<TradeModule> create(@RequestBody TradeModule tradeModule) {
        return ResponseEntity.ok(tradeModuleService.createTradeModule(tradeModule));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TradeModule> update(@PathVariable Long id, @RequestBody TradeModule tradeModule) {
        return ResponseEntity.ok(tradeModuleService.updateTradeModule(id, tradeModule));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        tradeModuleService.deleteTradeModule(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<TradeModule>> getAll() {
        return ResponseEntity.ok(tradeModuleService.getAllTradeModules());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TradeModule> getById(@PathVariable Long id) {
        return tradeModuleService.getTradeModuleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/trade/{tradeId}")
    public ResponseEntity<List<TradeModule>> getByTrade(@PathVariable Long tradeId) {
        return ResponseEntity.ok(tradeModuleService.getByTradeId(tradeId));
    }

    @GetMapping("/module/{moduleCourseId}")
    public ResponseEntity<List<TradeModule>> getByModule(@PathVariable Long moduleCourseId) {
        return ResponseEntity.ok(tradeModuleService.getByModuleCourseId(moduleCourseId));
    }
}
