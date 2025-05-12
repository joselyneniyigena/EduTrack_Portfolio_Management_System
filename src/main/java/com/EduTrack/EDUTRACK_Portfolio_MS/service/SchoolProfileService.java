package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.SchoolProfile;

import java.util.List;
import java.util.Optional;

public interface SchoolProfileService {
    SchoolProfile createProfile(SchoolProfile profile);
    SchoolProfile updateProfile(Long id, SchoolProfile updatedProfile);
    void deleteProfile(Long id);
    Optional<SchoolProfile> getProfileById(Long id);
    List<SchoolProfile> getAllProfiles();
}
