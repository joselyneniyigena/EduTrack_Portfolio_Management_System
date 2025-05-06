package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.AcademicYear;

import java.util.List;

public interface AcademicYearService {
    AcademicYear save(AcademicYear year);
    AcademicYear findById(Long id);
    List<AcademicYear> findAll();
    AcademicYear update(AcademicYear year);
    void deleteById(Long id);
}
