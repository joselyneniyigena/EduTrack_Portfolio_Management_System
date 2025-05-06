package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Sector;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trade;

import java.util.List;

public interface TradeService {
    Trade save(Trade trade);
    Trade findById(Long id);
    List<Trade> findAll();
    List<Trade> findBySector(Sector sector);
    Trade update(Trade trade);
    void deleteById(Long id);
}
