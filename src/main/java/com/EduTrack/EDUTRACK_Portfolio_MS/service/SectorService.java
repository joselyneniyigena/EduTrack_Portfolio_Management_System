package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Sector;

import java.util.List;
import java.util.Optional;

public interface SectorService {
    Sector createSector(Sector sector);
    Sector updateSector(Long id, Sector updatedSector);
    void deleteSector(Long id);
    Optional<Sector> getSectorById(Long id);
    List<Sector> getAllSectors();
    List<Sector> getSectorsByRTQFLevelId(Long rtqfLevelId);
}
