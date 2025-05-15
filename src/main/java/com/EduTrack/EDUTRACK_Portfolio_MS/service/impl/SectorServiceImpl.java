package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.RTQFLevel;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Sector;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.RTQFLevelRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.SectorRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.SectorService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SectorServiceImpl implements SectorService {

    private final SectorRepository sectorRepository;
    private final RTQFLevelRepository rtqfLevelRepository;
    @Override
    public Sector createSector(Sector sector) {
        return sectorRepository.save(sector);
    }

    @Override
    public Sector updateSector(Long id, Sector updatedSector) {
        Sector existing = sectorRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sector not found with ID: " + id));

        existing.setName(updatedSector.getName());
        existing.setDescription(updatedSector.getDescription());
        existing.setAbbreviation(updatedSector.getAbbreviation());

        if (updatedSector.getRtqfLevel() != null) {
            RTQFLevel rtqfLevel = rtqfLevelRepository.findById(updatedSector.getRtqfLevel().getId())
                    .orElseThrow(() -> new EntityNotFoundException("RTQF Level not found"));
            existing.setRtqfLevel(rtqfLevel);
        }

        return sectorRepository.save(existing);
    }

    @Override
    public void deleteSector(Long id) {
        sectorRepository.deleteById(id);
    }

    @Override
    public Optional<Sector> getSectorById(Long id) {
        return sectorRepository.findById(id);
    }

    @Override
    public List<Sector> getAllSectors() {
        return sectorRepository.findAll();
    }

    @Override
    public List<Sector> getSectorsByRTQFLevelId(Long rtqfLevelId) {
        RTQFLevel rtqfLevel = rtqfLevelRepository.findById(rtqfLevelId)
                .orElseThrow(() -> new EntityNotFoundException("RTQF Level not found"));
        return sectorRepository.findByRtqfLevel(rtqfLevel);
    }
}
