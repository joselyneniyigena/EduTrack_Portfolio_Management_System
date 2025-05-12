package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.ModuleCourse;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.ModuleCourseRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.ModuleCourseService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ModuleCourseServiceImpl implements ModuleCourseService {


    private final ModuleCourseRepository moduleCourseRepository;

    @Override
    public ModuleCourse createModuleCourse(ModuleCourse module) {
        return moduleCourseRepository.save(module);
    }

    @Override
    public ModuleCourse updateModuleCourse(Long id, ModuleCourse updatedModule) {
        ModuleCourse existing = moduleCourseRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Module Course not found with ID: " + id));

        existing.setName(updatedModule.getName());
        existing.setType(updatedModule.getType());
        existing.setPassMark(updatedModule.getPassMark());
        existing.setCompetence(updatedModule.getCompetence());
        existing.setCredits(updatedModule.getCredits());

        return moduleCourseRepository.save(existing);
    }

    @Override
    public void deleteModuleCourse(Long id) {
        moduleCourseRepository.deleteById(id);
    }

    @Override
    public Optional<ModuleCourse> getModuleCourseById(Long id) {
        return moduleCourseRepository.findById(id);
    }

    @Override
    public List<ModuleCourse> getAllModuleCourses() {
        return moduleCourseRepository.findAll();
    }

    @Override
    public List<ModuleCourse> getModuleCoursesByType(ModuleCourse.ModuleType type) {
        return moduleCourseRepository.findByType(type);
    }
}
