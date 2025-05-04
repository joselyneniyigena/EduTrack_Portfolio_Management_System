package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnit;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.ModuleCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LearningUnitRepository extends JpaRepository<LearningUnit, Long> {
    List<LearningUnit> findByModule(ModuleCourse module);

}
