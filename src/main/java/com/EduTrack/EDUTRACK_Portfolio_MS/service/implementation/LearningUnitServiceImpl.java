package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnit;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.ModuleCourse;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.LearningUnitRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.LearningUnitService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LearningUnitServiceImpl implements LearningUnitService {

    private final LearningUnitRepository repository;
    @Override
    public LearningUnit save(LearningUnit learningUnit) {
        return repository.save(learningUnit);
    }

    @Override
    public LearningUnit findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<LearningUnit> findByModule(ModuleCourse module) {
        return repository.findByModule(module);
    }

    @Override
    public List<LearningUnit> findAll() {
        return repository.findAll();
    }

    @Override
    public LearningUnit update(LearningUnit learningUnit) {
        return repository.save(learningUnit);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
