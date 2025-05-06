package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.RTQFLevel;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.RTQFLevelService;
import lombok.RequiredArgsConstructor;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.RTQFLevelRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RTQFLevelServiceImpl implements RTQFLevelService {

    private final RTQFLevelRepository repository;

    @Override
    public RTQFLevel save(RTQFLevel level) {
        return repository.save(level);
    }

    @Override
    public RTQFLevel findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Optional<RTQFLevel> findByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public List<RTQFLevel> findAll() {
        return repository.findAll();
    }

    @Override
    public RTQFLevel update(RTQFLevel rtqfLevel) {
        return repository.save(rtqfLevel);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
