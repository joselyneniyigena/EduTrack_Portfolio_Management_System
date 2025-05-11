package com.EduTrack.EDUTRACK_Portfolio_MS.controller;


import com.EduTrack.EDUTRACK_Portfolio_MS.dto.EvidenceDTO;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.GeneralEntityServices;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/evidences")
@RequiredArgsConstructor
public class EvidenceController {

    private final GeneralEntityServices service;

    @GetMapping
    public List<EvidenceDTO> getAllEvidences() {
        return service.getEvidences();
    }
}
