package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.AcademicYear;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.AcademicYearRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.AcademicYearService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AcademicYearServiceImpl implements AcademicYearService {

    private final AcademicYearRepository repository;
    @Override
    public AcademicYear save(AcademicYear year) {
        return repository.save(year);
    }

    @Override
    public AcademicYear findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<AcademicYear> findAll() {
        return repository.findAll();
    }

    @Override
    public AcademicYear update(AcademicYear year) {
        return repository.save(year);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
