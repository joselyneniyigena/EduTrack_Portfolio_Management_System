package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.ModuleCourse;

import java.util.List;
import java.util.Optional;

public interface ModuleCourseService {
    ModuleCourse createModuleCourse(ModuleCourse module);
    ModuleCourse updateModuleCourse(Long id, ModuleCourse updatedModule);
    void deleteModuleCourse(Long id);
    Optional<ModuleCourse> getModuleCourseById(Long id);
    List<ModuleCourse> getAllModuleCourses();
    List<ModuleCourse> getModuleCoursesByType(ModuleCourse.ModuleType type);
}
