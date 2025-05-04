package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.ModuleCourse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ModuleCourseRepository extends JpaRepository<ModuleCourse, Long> {
    List<ModuleCourse> findByType(ModuleCourse.ModuleType type);

}
