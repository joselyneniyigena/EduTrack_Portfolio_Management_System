package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trade;

import java.util.List;
import java.util.Optional;

public interface TradeService {
    Trade createTrade(Trade trade);
    Trade updateTrade(Long id, Trade updatedTrade);
    void deleteTrade(Long id);
    Optional<Trade> getTradeById(Long id);
    List<Trade> getAllTrades();
    List<Trade> getTradesBySectorId(Long sectorId);
}
