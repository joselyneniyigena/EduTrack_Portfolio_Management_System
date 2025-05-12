package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.ModuleCourse;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trade;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TradeModule;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.ModuleCourseRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TradeModuleRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.TradeRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TradeModuleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TradeModuleServiceImpl implements TradeModuleService {

    private final TradeModuleRepository tradeModuleRepository;
    private final TradeRepository tradeRepository;
    private final ModuleCourseRepository moduleCourseRepository;

    @Override
    public TradeModule createTradeModule(TradeModule tradeModule) {
        return tradeModuleRepository.save(tradeModule);
    }

    @Override
    public TradeModule updateTradeModule(Long id, TradeModule updated) {
        TradeModule existing = tradeModuleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("TradeModule not found with ID: " + id));

        if (updated.getTrade() != null) {
            Trade trade = tradeRepository.findById(updated.getTrade().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Trade not found"));
            existing.setTrade(trade);
        }

        if (updated.getModule() != null) {
            ModuleCourse module = moduleCourseRepository.findById(updated.getModule().getId())
                    .orElseThrow(() -> new EntityNotFoundException("ModuleCourse not found"));
            existing.setModule(module);
        }

        return tradeModuleRepository.save(existing);
    }

    @Override
    public void deleteTradeModule(Long id) {
        tradeModuleRepository.deleteById(id);
    }

    @Override
    public Optional<TradeModule> getTradeModuleById(Long id) {
        return tradeModuleRepository.findById(id);
    }

    @Override
    public List<TradeModule> getAllTradeModules() {
        return tradeModuleRepository.findAll();
    }

    @Override
    public List<TradeModule> getByTradeId(Long tradeId) {
        Trade trade = tradeRepository.findById(tradeId)
                .orElseThrow(() -> new EntityNotFoundException("Trade not found"));
        return tradeModuleRepository.findByTrade(trade);
    }

    @Override
    public List<TradeModule> getByModuleCourseId(Long moduleCourseId) {
        ModuleCourse module = moduleCourseRepository.findById(moduleCourseId)
                .orElseThrow(() -> new EntityNotFoundException("ModuleCourse not found"));
        return tradeModuleRepository.findByModule(module);
    }
}
