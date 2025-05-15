package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.AcademicYear;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.AcademicYearRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.AcademicYearService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
@Service
@RequiredArgsConstructor
public class AcademicYearServiceImpl implements AcademicYearService {

    private final AcademicYearRepository academicYearRepository;
    @Override
    public AcademicYear createAcademicYear(AcademicYear academicYear) {
        return academicYearRepository.save(academicYear);
    }

    @Override
    public AcademicYear updateAcademicYear(Long id, AcademicYear updatedYear) {
        AcademicYear existing = academicYearRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Academic Year not found with ID: " + id));

        existing.setYear(updatedYear.getYear());
        existing.setStartDate(updatedYear.getStartDate());
        existing.setEndDate(updatedYear.getEndDate());
        existing.setStatus(updatedYear.getStatus());

        return academicYearRepository.save(existing);
    }

    @Override
    public void deleteAcademicYear(Long id) {
        academicYearRepository.deleteById(id);
    }

    @Override
    public List<AcademicYear> getAllAcademicYears() {
        return academicYearRepository.findAll();
    }

    @Override
    public Optional<AcademicYear> getAcademicYearById(Long id) {
        return academicYearRepository.findById(id);
    }

    @Override
    public Optional<AcademicYear> getCurrentAcademicYear() {
        LocalDate today = LocalDate.now();
        return academicYearRepository.findByStartDateBeforeAndEndDateAfter(today, today);
    }
}
