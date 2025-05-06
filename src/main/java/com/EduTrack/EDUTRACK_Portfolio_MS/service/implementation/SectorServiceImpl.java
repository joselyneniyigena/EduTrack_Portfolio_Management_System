package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.RTQFLevel;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Sector;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.SectorRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.SectorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor

public class SectorServiceImpl implements SectorService {

    private final SectorRepository repository;
    @Override
    public Sector save(Sector sector) {
        return repository.save(sector);
    }

    @Override
    public Sector findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Sector> findByRTQFLevel(RTQFLevel level) {
        return repository.findByRTQFLevel(level);
    }

    @Override
    public List<Sector> findAll() {
        return repository.findAll();
    }

    @Override
    public Sector update(Sector sector) {
        return repository.save(sector);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
