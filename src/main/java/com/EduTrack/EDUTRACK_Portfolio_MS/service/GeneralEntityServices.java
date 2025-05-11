package com.EduTrack.EDUTRACK_Portfolio_MS.service;


import com.EduTrack.EDUTRACK_Portfolio_MS.dto.*;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.SchoolProfile;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GeneralEntityServices {

    private final SchoolProfileRepository schoolProfileRepository;
    private final AssessmentRepository assessmentRepository;
    private final AcademicYearRepository academicYearRepository;
    private final TermRepository termRepository;
    private final LearningUnitRepository learningUnitRepository;
    private final EvidenceRepository evidenceRepository;

    // SCHOOL PROFILE
    public List<SchoolProfileDTO> getAllSchools() {
        return schoolProfileRepository.findAll()
                .stream()
                .map(MapperUtil::toDto)
                .collect(Collectors.toList());
    }

    public SchoolProfileDTO getSchoolById(Long id) {
        return schoolProfileRepository.findById(id)
                .map(MapperUtil::toDto)
                .orElseThrow(() -> new RuntimeException("School not found"));
    }

    @Transactional
    public SchoolProfileDTO createSchool(SchoolProfileDTO dto) {
        return MapperUtil.toDto(schoolProfileRepository.save(MapperUtil.toEntity(dto)));
    }

    @Transactional
    public SchoolProfileDTO updateSchool(Long id, SchoolProfileDTO dto) {
        SchoolProfile s = schoolProfileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("School not found"));

        s.setName(dto.getName());
        s.setLogo(dto.getLogo());
        s.setPhoneNbr(dto.getPhoneNbr());
        s.setEmail(dto.getEmail());
        s.setAddress(dto.getAddress());
        s.setDescription(dto.getDescription());

        return MapperUtil.toDto(schoolProfileRepository.save(s));
    }

    @Transactional
    public void deleteSchool(Long id) {
        if (!schoolProfileRepository.existsById(id)) throw new RuntimeException("School not found");
        schoolProfileRepository.deleteById(id);
    }

    // ASSESSMENT
    public List<AssessmentDTO> getAllAssessments() {
        return assessmentRepository.findAll()
                .stream().map(MapperUtil::toDto)
                .collect(Collectors.toList());
    }

    public AssessmentDTO getAssessmentById(Long id) {
        return assessmentRepository.findById(id)
                .map(MapperUtil::toDto)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));
    }

    @Transactional
    public void deleteAssessment(Long id) {
        if (!assessmentRepository.existsById(id)) throw new RuntimeException("Assessment not found");
        assessmentRepository.deleteById(id);
    }

    // ACADEMIC YEAR
    public List<AcademicYearDTO> getAcademicYears() {
        return academicYearRepository.findAll()
                .stream().map(MapperUtil::toDto)
                .collect(Collectors.toList());
    }

    // TERM
    public List<TermDTO> getTerms() {
        return termRepository.findAll()
                .stream().map(MapperUtil::toDto)
                .collect(Collectors.toList());
    }

    // LEARNING UNIT
    public List<LearningUnitDTO> getLearningUnits() {
        return learningUnitRepository.findAll()
                .stream().map(MapperUtil::toDto)
                .collect(Collectors.toList());
    }

    // EVIDENCE
    public List<EvidenceDTO> getEvidences() {
        return evidenceRepository.findAll()
                .stream().map(MapperUtil::toDto)
                .collect(Collectors.toList());
    }
}

