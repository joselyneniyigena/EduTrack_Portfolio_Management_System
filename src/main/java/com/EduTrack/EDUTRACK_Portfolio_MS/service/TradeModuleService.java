package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trade;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TradeModule;

import java.util.List;

public interface TradeModuleService {
    TradeModule save(TradeModule tradeModule);
    TradeModule findById(Long id);
    List<TradeModule> findByTrade(Trade trade);
    List<TradeModule> findAll();
    TradeModule update(TradeModule tradeModule);
    void deleteById(Long id);

}
