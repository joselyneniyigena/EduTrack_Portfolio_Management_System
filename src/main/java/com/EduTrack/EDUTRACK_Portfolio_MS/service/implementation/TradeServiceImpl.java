package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Sector;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trade;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.SectorRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TradeRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TradeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TradeServiceImpl implements TradeService {


    private final TradeRepository tradeRepository;
    private final SectorRepository sectorRepository;

    @Override
    public Trade createTrade(Trade trade) {
        return tradeRepository.save(trade);
    }

    @Override
    public Trade updateTrade(Long id, Trade updatedTrade) {
        Trade existing = tradeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trade not found with ID: " + id));

        existing.setName(updatedTrade.getName());
        existing.setDescription(updatedTrade.getDescription());
        existing.setAbbreviation(updatedTrade.getAbbreviation());

        if (updatedTrade.getSector() != null) {
            Sector sector = sectorRepository.findById(updatedTrade.getSector().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Sector not found"));
            existing.setSector(sector);
        }

        return tradeRepository.save(existing);
    }

    @Override
    public void deleteTrade(Long id) {
        tradeRepository.deleteById(id);
    }

    @Override
    public Optional<Trade> getTradeById(Long id) {
        return tradeRepository.findById(id);
    }

    @Override
    public List<Trade> getAllTrades() {
        return tradeRepository.findAll();
    }

    @Override
    public List<Trade> getTradesBySectorId(Long sectorId) {
        Sector sector = sectorRepository.findById(sectorId)
                .orElseThrow(() -> new EntityNotFoundException("Sector not found"));
        return tradeRepository.findBySector(sector);
    }
}
