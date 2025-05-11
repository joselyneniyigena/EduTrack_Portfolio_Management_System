package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.ModuleCourse;

import java.util.List;

public interface ModuleCourseService {
    ModuleCourse save(ModuleCourse moduleCourse);
    ModuleCourse findById(Long id);
    List<ModuleCourse> findByType(ModuleCourse.ModuleType type);
    List<ModuleCourse> findAll();
    ModuleCourse update(ModuleCourse moduleCourse);
    void deleteById(Long id);
}
