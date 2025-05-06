package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Evidence;

import java.util.List;

public interface EvidenceService {
    Evidence save(Evidence evidence);
    Evidence findById(Long id);
    List<Evidence> findAll();
    Evidence update(Evidence evidence);
    void deleteById(Long id);
}
