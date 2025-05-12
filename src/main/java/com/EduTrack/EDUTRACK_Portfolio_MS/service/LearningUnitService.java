package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnit;

import java.util.List;
import java.util.Optional;

public interface LearningUnitService {
    LearningUnit createLearningUnit(LearningUnit unit);
    LearningUnit updateLearningUnit(Long id, LearningUnit updatedUnit);
    void deleteLearningUnit(Long id);
    Optional<LearningUnit> getLearningUnitById(Long id);
    List<LearningUnit> getAllLearningUnits();
    List<LearningUnit> getLearningUnitsByModuleCourseId(Long moduleCourseId);
}
