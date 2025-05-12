package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.TradeModule;

import java.util.List;
import java.util.Optional;

public interface TradeModuleService {
    TradeModule createTradeModule(TradeModule tradeModule);
    TradeModule updateTradeModule(Long id, TradeModule updated);
    void deleteTradeModule(Long id);
    Optional<TradeModule> getTradeModuleById(Long id);
    List<TradeModule> getAllTradeModules();
    List<TradeModule> getByTradeId(Long tradeId);
    List<TradeModule> getByModuleCourseId(Long moduleCourseId);
}
