package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Evidence;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.EvidenceRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.EvidenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class EvidenceServiceImpl implements EvidenceService {

    private final EvidenceRepository repository;
    @Override
    public Evidence save(Evidence evidence) {
        return repository.save(evidence);
    }

    @Override
    public Evidence findById(Long id) {
        return  repository.findById(id).orElse(null);
    }

    @Override
    public List<Evidence> findAll() {
        return repository.findAll();
    }

    @Override
    public Evidence update(Evidence evidence) {
        return repository.save(evidence);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
