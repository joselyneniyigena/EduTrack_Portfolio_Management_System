package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.SchoolProfile;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.SchoolProfileRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.SchoolProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SchoolProfileServiceImpl implements SchoolProfileService {

    private final SchoolProfileRepository repository;

    @Override
    public SchoolProfile save(SchoolProfile profile) {
        return repository.save(profile);
    }

    @Override
    public SchoolProfile findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<SchoolProfile> findAll() {
        return repository.findAll();
    }

    @Override
    public SchoolProfile update(SchoolProfile profile) {
        return repository.save(profile);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
