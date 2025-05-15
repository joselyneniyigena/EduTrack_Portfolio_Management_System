package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.SchoolProfile;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.SchoolProfileRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.SchoolProfileService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SchoolProfileServiceImpl implements SchoolProfileService {

    private final SchoolProfileRepository schoolProfileRepository;

    @Override
    public SchoolProfile createProfile(SchoolProfile profile) {
        return schoolProfileRepository.save(profile);
    }

    @Override
    public SchoolProfile updateProfile(Long id, SchoolProfile updatedProfile) {
        SchoolProfile existing = schoolProfileRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("School profile not found with ID: " + id));

        existing.setName(updatedProfile.getName());
        existing.setLogo(updatedProfile.getLogo());
        existing.setPhoneNbr(updatedProfile.getPhoneNbr());
        existing.setEmail(updatedProfile.getEmail());
        existing.setAddress(updatedProfile.getAddress());
        existing.setDescription(updatedProfile.getDescription());

        return schoolProfileRepository.save(existing);
    }

    @Override
    public void deleteProfile(Long id) {
        schoolProfileRepository.deleteById(id);
    }

    @Override
    public Optional<SchoolProfile> getProfileById(Long id) {
        return schoolProfileRepository.findById(id);
    }

    @Override
    public List<SchoolProfile> getAllProfiles() {
        return schoolProfileRepository.findAll();
    }
}
