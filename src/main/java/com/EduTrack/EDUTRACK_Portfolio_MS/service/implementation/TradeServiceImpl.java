package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Sector;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trade;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TradeRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class TradeServiceImpl implements TradeService {

    private final TradeRepository repository;
    @Override
    public Trade save(Trade trade) {
        return repository.save(trade);
    }

    @Override
    public Trade findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Trade> findAll() {
        return repository.findAll();
    }

    @Override
    public List<Trade> findBySector(Sector sector) {
        return repository.findBySector(sector);
    }

    @Override
    public Trade update(Trade trade) {
        return repository.save(trade);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
