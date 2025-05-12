package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.RTQFLevel;

import java.util.List;
import java.util.Optional;

public interface RTQFLevelService {
    RTQFLevel createLevel(RTQFLevel level);
    RTQFLevel updateLevel(Long id, RTQFLevel updatedLevel);
    void deleteLevel(Long id);
    Optional<RTQFLevel> getLevelById(Long id);
    List<RTQFLevel> getAllLevels();
}
