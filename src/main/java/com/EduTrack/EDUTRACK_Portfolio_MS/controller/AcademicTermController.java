package com.EduTrack.EDUTRACK_Portfolio_MS.controller;


import com.EduTrack.EDUTRACK_Portfolio_MS.dto.AcademicYearDTO;
import com.EduTrack.EDUTRACK_Portfolio_MS.dto.TermDTO;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.GeneralEntityServices;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/academic")
@RequiredArgsConstructor
public class AcademicTermController {

    private final GeneralEntityServices service;

    @GetMapping("/years")
    public List<AcademicYearDTO> getAllAcademicYears() {
        return service.getAcademicYears();
    }

    @GetMapping("/terms")
    public List<TermDTO> getAllTerms() {
        return service.getTerms();
    }
}
