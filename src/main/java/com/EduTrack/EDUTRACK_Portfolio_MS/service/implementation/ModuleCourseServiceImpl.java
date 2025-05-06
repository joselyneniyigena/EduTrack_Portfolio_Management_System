package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.ModuleCourse;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.ModuleCourseRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.ModuleCourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ModuleCourseServiceImpl implements ModuleCourseService {

    private final ModuleCourseRepository repository;
    @Override
    public ModuleCourse save(ModuleCourse moduleCourse) {
        return repository.save(moduleCourse);
    }

    @Override
    public ModuleCourse findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<ModuleCourse> findByType(String type) {
        return repository.findByType(type);
    }

    @Override
    public List<ModuleCourse> findAll() {

        return repository.findAll();
    }

    @Override
    public ModuleCourse update(ModuleCourse moduleCourse) {
        return repository.save(moduleCourse);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
