package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.RTQFLevel;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Sector;

import java.util.List;

public interface SectorService {
    Sector save(Sector sector);
    Sector findById(Long id);
    List<Sector> findByRTQFLevel(RTQFLevel level);
    List<Sector> findAll();
    Sector update(Sector sector);
    void deleteById(Long id);
}
