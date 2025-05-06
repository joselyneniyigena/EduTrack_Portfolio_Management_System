package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.RTQFLevel;

import java.util.List;
import java.util.Optional;

public interface RTQFLevelService {
    RTQFLevel save(RTQFLevel level);
    RTQFLevel findById(Long id);
    Optional<RTQFLevel> findByName(String name);
    List<RTQFLevel> findAll();
    RTQFLevel update(RTQFLevel rtqfLevel);
    void deleteById(Long id);
}
