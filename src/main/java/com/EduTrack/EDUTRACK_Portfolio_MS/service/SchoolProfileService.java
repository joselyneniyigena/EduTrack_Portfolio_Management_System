package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.SchoolProfile;

import java.util.List;

public interface SchoolProfileService {
    SchoolProfile save(SchoolProfile profile);
    SchoolProfile findById(Long id);
    List<SchoolProfile> findAll();
    SchoolProfile update(SchoolProfile profile);
    void deleteById(Long id);
}
