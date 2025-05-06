package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnit;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.ModuleCourse;

import java.util.List;

public interface LearningUnitService {
    LearningUnit save(LearningUnit learningUnit);
    LearningUnit findById(Long id);
    List<LearningUnit> findByModule(ModuleCourse module);
    List<LearningUnit> findAll();
    LearningUnit update(LearningUnit learningUnit);
    void deleteById(Long id);
}
