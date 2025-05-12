package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.AcademicYear;

import java.util.List;
import java.util.Optional;

public interface AcademicYearService {
    AcademicYear createAcademicYear(AcademicYear academicYear);
    AcademicYear updateAcademicYear(Long id, AcademicYear updatedYear);
    void deleteAcademicYear(Long id);
    List<AcademicYear> getAllAcademicYears();
    Optional<AcademicYear> getAcademicYearById(Long id);
    Optional<AcademicYear> getCurrentAcademicYear();
}
