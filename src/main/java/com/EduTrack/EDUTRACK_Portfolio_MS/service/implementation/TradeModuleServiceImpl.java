package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trade;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TradeModule;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TradeModuleRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TradeModuleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TradeModuleServiceImpl implements TradeModuleService {

    private final TradeModuleRepository repository;

    @Override
    public TradeModule save(TradeModule tradeModule) {
        return repository.save(tradeModule);
    }

    @Override
    public TradeModule findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<TradeModule> findByTrade(Trade trade) {
        return repository.findByTrade(trade);
    }

    @Override
    public List<TradeModule> findAll() {
        return repository.findAll();
    }

    @Override
    public TradeModule update(TradeModule tradeModule) {
        return repository.save(tradeModule);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
