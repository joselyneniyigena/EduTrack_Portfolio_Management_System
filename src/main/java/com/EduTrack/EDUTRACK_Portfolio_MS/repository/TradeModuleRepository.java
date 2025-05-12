package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.ModuleCourse;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Trade;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.TradeModule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TradeModuleRepository extends JpaRepository<TradeModule, Long> {
    List<TradeModule> findByTrade(Trade trade);
    List<TradeModule> findByModule(ModuleCourse module);
}
