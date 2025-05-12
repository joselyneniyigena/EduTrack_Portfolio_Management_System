package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.RTQFLevel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RTQFLevelRepository extends JpaRepository<RTQFLevel, Long> {
    boolean existsByName(String name);
}
