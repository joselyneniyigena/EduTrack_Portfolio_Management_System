package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.RTQFLevel;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.RTQFLevelRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.RTQFLevelService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RTQFLevelServiceImpl implements RTQFLevelService {

    private final RTQFLevelRepository rtqfLevelRepository;
    @Override
    public RTQFLevel createLevel(RTQFLevel level) {
        return rtqfLevelRepository.save(level);
    }

    @Override
    public RTQFLevel updateLevel(Long id, RTQFLevel updatedLevel) {
        RTQFLevel existing = rtqfLevelRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("RTQF Level not found with ID: " + id));

        existing.setName(updatedLevel.getName());
        existing.setDescription(updatedLevel.getDescription());

        return rtqfLevelRepository.save(existing);
    }

    @Override
    public void deleteLevel(Long id) {
        if (!rtqfLevelRepository.existsById(id)) {
            throw new EntityNotFoundException("RTQF Level not found with ID: " + id);
        }
        rtqfLevelRepository.deleteById(id);
    }

    @Override
    public Optional<RTQFLevel> getLevelById(Long id) {
        return rtqfLevelRepository.findById(id);
    }

    @Override
    public List<RTQFLevel> getAllLevels() {
        return rtqfLevelRepository.findAll();
    }
}
