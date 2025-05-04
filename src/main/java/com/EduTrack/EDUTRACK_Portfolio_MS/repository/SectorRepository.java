package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.RTQFLevel;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.Sector;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SectorRepository extends JpaRepository<Sector, Long> {
    List<Sector> findByRTQFLevel(RTQFLevel rtqfLevel);
}
