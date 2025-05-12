package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.LearningUnit;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.ModuleCourse;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.LearningUnitRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.ModuleCourseRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.LearningUnitService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LearningUnitServiceImpl implements LearningUnitService {

    private final LearningUnitRepository learningUnitRepository;
    private final ModuleCourseRepository moduleCourseRepository;

    @Override
    public LearningUnit createLearningUnit(LearningUnit unit) {
        return learningUnitRepository.save(unit);
    }

    @Override
    public LearningUnit updateLearningUnit(Long id, LearningUnit updatedUnit) {
        LearningUnit existing = learningUnitRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Learning Unit not found with ID: " + id));

        existing.setName(updatedUnit.getName());
        existing.setObjective(updatedUnit.getObjective());
        existing.setDescription(updatedUnit.getDescription());
        existing.setLearningOutcome(updatedUnit.getLearningOutcome());

        if (updatedUnit.getModule() != null) {
            ModuleCourse module = moduleCourseRepository.findById(updatedUnit.getModule().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Module Course not found"));
            existing.setModule(module);
        }

        return learningUnitRepository.save(existing);
    }

    @Override
    public void deleteLearningUnit(Long id) {
        learningUnitRepository.deleteById(id);
    }

    @Override
    public Optional<LearningUnit> getLearningUnitById(Long id) {
        return learningUnitRepository.findById(id);
    }

    @Override
    public List<LearningUnit> getAllLearningUnits() {
        return learningUnitRepository.findAll();
    }

    @Override
    public List<LearningUnit> getLearningUnitsByModuleCourseId(Long moduleCourseId) {
        ModuleCourse module = moduleCourseRepository.findById(moduleCourseId)
                .orElseThrow(() -> new EntityNotFoundException("Module Course not found"));
        return learningUnitRepository.findByModule(module);
    }
}
