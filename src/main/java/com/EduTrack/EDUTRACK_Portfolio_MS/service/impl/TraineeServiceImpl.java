package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.dto.SignupRequest;
import com.EduTrack.EDUTRACK_Portfolio_MS.dto.TraineeProfileDTO;
import com.EduTrack.EDUTRACK_Portfolio_MS.enums.PromotionStatus;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.*;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.*;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.TraineeService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TraineeServiceImpl implements TraineeService {

    private final TraineeRepository traineeRepository;
    private final AcademicYearRepository academicYearRepository;
    private final TermRepository termRepository;
    private final TraineePromotionRepository traineePromotionRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final RTQFLevelRepository rtqfLevelRepository;
    private final SectorRepository sectorRepository;
    private final TradeRepository tradeRepository;
    private final CustomUserDetailsService userService;


    @Override
    @Transactional
    public Trainee createTrainee(TraineeProfileDTO traineeProfileDTO) throws Exception {
        // 1. Map the request to Trainee entity
        Trainee trainee = Trainee.builder()
                .firstName(traineeProfileDTO.getFirstName())
                .lastName(traineeProfileDTO.getLastName())
                .email(traineeProfileDTO.getEmail())
                .phoneNumber(traineeProfileDTO.getPhoneNumber())
                .address(traineeProfileDTO.getAddress())
                .traineeId(traineeProfileDTO.getTraineeId())
                .dob(traineeProfileDTO.getDob())
                .gender(traineeProfileDTO.getGender())
                .maritalStatus(traineeProfileDTO.getMaritalStatus())
                .professionalBackground(traineeProfileDTO.getProfessionalBackground())
                .previousExperience(traineeProfileDTO.getPreviousExperience())
                .qualifications(traineeProfileDTO.getQualifications())
                .emergencyContactName(traineeProfileDTO.getEmergencyContactName())
                .emergencyContactPhone(traineeProfileDTO.getEmergencyContactPhone())
                .nationality(traineeProfileDTO.getNationality())
                .languagePreference(traineeProfileDTO.getLanguagePreference())
                .build();

        Trainee savedTrainee = traineeRepository.save(trainee);

        AcademicYear activeAcademicYear = academicYearRepository.findByStatus(AcademicYear.AcademicYearStatus.ACTIVE)
                .orElseThrow(() -> new EntityNotFoundException("No active Academic Year Found"));

        Term activeTerm = termRepository.findByAcademicYearAndStatus(activeAcademicYear, "ACTIVE")
                .orElseThrow(() -> new IllegalStateException("No active term found for the current academic year."));

        // 3. Admit a trainee into that academic year and term

        if (isSectorAndLevelValid(traineeProfileDTO) &&
                traineeProfileDTO.getTrade() != null &&
                traineeProfileDTO.getTrade().getId() != null) {
            Trade trade = tradeRepository.findById(traineeProfileDTO.getTrade().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Trade not found with ID: " + traineeProfileDTO.getTrade().getId()));
            TraineePromotion traineePromotion = TraineePromotion.builder()
                    .trainee(savedTrainee)
                    .term(activeTerm)
                    .trade(trade)
                    .status(PromotionStatus.ADMITTED)
                    .build();
            traineePromotionRepository.save(traineePromotion);
        }

        // 4. Create User with temporary Password
        String temporaryPassword = UUID.randomUUID().toString().substring(0, 8); // Generate a random 8-character password
        User user = User.builder()
                .username(trainee.getTraineeId())
                .password(temporaryPassword)
                .email(trainee.getEmail())
                .enabled(true)
                .userReference(trainee.getTraineeId())
                .firstName(trainee.getFirstName())
                .lastName(trainee.getLastName())
                .phoneNumber(trainee.getPhoneNumber())
                .address(trainee.getAddress())
                .registrationDate(new Date())
                .lastModifiedDate(new Date())
                .build();
        SignupRequest signupRequest = new SignupRequest();
        BeanUtils.copyProperties(user, signupRequest);

        Set<String> roles = Set.of("TRAINEE");
        signupRequest.setRoles(roles);
        userService.registerUser(signupRequest);
        emailService.sendAdmissionEmail(trainee.getEmail(), trainee.getFirstName() + " " + trainee.getLastName(), trainee.getTraineeId(), temporaryPassword);

        return savedTrainee;
    }

    private boolean isSectorAndLevelValid(TraineeProfileDTO traineeProfileDTO) {
        return traineeProfileDTO.getLevel() != null && traineeProfileDTO.getLevel().getId() != null
                && rtqfLevelRepository.findById(traineeProfileDTO.getLevel().getId()).isPresent()
                && traineeProfileDTO.getSector() != null && traineeProfileDTO.getSector().getId() != null
                && sectorRepository.findById(traineeProfileDTO.getSector().getId()).isPresent();
    }


    @Override
    @Transactional
    public Trainee updateTrainee(Long id, TraineeProfileDTO dto) {
        Trainee existing = traineeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Trainee not found with ID: " + id));

        // Update basic info
        existing.setTraineeId(dto.getTraineeId());
        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setDob(dto.getDob());
        existing.setGender(dto.getGender());
        existing.setMaritalStatus(dto.getMaritalStatus());
        existing.setEmail(dto.getEmail());
        existing.setPhoneNumber(dto.getPhoneNumber());
        existing.setAddress(dto.getAddress());
        existing.setProfessionalBackground(dto.getProfessionalBackground());
        existing.setPreviousExperience(dto.getPreviousExperience());
        existing.setQualifications(dto.getQualifications());
        existing.setEmergencyContactName(dto.getEmergencyContactName());
        existing.setEmergencyContactPhone(dto.getEmergencyContactPhone());
        existing.setNationality(dto.getNationality());
        existing.setLanguagePreference(dto.getLanguagePreference());

        Trainee savedTrainee = traineeRepository.save(existing);

        if (isSectorAndLevelValid(dto) &&
                dto.getTrade() != null && dto.getTrade().getId() != null) {

            AcademicYear activeAcademicYear = academicYearRepository.findByStatus(AcademicYear.AcademicYearStatus.ACTIVE)
                    .orElseThrow(() -> new EntityNotFoundException("No active Academic Year Found"));

            Term activeTerm = termRepository.findByAcademicYearAndStatus(activeAcademicYear, "ACTIVE")
                    .orElseThrow(() -> new IllegalStateException("No active term found for the current academic year."));

            Trade trade = tradeRepository.findById(dto.getTrade().getId())
                    .orElseThrow(() -> new EntityNotFoundException("Trade not found with ID: " + dto.getTrade().getId()));

            Optional<TraineePromotion> existingPromotionOpt = traineePromotionRepository
                    .findByTrainee_IdAndTerm_AcademicYear_Status(savedTrainee.getId(), AcademicYear.AcademicYearStatus.ACTIVE);

            if (existingPromotionOpt.isPresent()) {
                TraineePromotion existingPromotion = existingPromotionOpt.get();
                existingPromotion.setTrade(trade);
                existingPromotion.setTerm(activeTerm);
                existingPromotion.setStatus(PromotionStatus.ADMITTED);
                traineePromotionRepository.save(existingPromotion);
            } else {
                TraineePromotion newPromotion = TraineePromotion.builder()
                        .trainee(savedTrainee)
                        .term(activeTerm)
                        .trade(trade)
                        .status(PromotionStatus.ADMITTED)
                        .build();
                traineePromotionRepository.save(newPromotion);
            }
        }

        return savedTrainee;
    }

    @Override
    public void deleteTrainee(Long id) {
        traineeRepository.deleteById(id);
    }

    @Override
    public Optional<TraineeProfileDTO> getTraineeById(Long id) {
        return traineeRepository.findById(id)
                .map(this::getTraineeProfileDTO);
    }

    @Override
    public Optional<TraineeProfileDTO> getTraineeByTraineeId(String traineeId) {
        return traineeRepository.findByTraineeId(traineeId)
                .map(this::getTraineeProfileDTO);
    }

    @Override
    public List<TraineeProfileDTO> getAllTrainees() {
        List<Trainee> allTrainees = traineeRepository.findAll();

        Map<String, TraineePromotion> promotionMap = traineePromotionRepository.findAll()
                .stream()
                .filter(p -> p.getTrainee() != null && p.getTrainee().getId() != null)
                .collect(Collectors.toMap(
                        p -> String.valueOf(p.getTrainee().getId()),
                        p -> p,
                        (existing, replacement) -> replacement // handle duplicates if needed
                ));

        return allTrainees.stream().map(trainee -> {
            TraineeProfileDTO dto = new TraineeProfileDTO();
            BeanUtils.copyProperties(trainee, dto);

            TraineePromotion promotion = promotionMap.get(String.valueOf(trainee.getId()));
            if (promotion != null) {
                dto.setTrade(promotion.getTrade());
                if (promotion.getTrade() != null && promotion.getTrade().getSector() != null) {
                    dto.setSector(promotion.getTrade().getSector());
                    dto.setLevel(promotion.getTrade().getSector().getRtqfLevel());
                }
            }
            return dto;
        }).collect(Collectors.toList());
    }

    @Override
    public Long countTrainees() {
        return traineeRepository.findMaxId();
    }

    private TraineeProfileDTO getTraineeProfileDTO(Trainee trainee) {
        TraineeProfileDTO dto = new TraineeProfileDTO();
        BeanUtils.copyProperties(trainee, dto);

        Optional<TraineePromotion> activePromotion = traineePromotionRepository
                .findByTrainee_IdAndTerm_AcademicYear_Status(
                        trainee.getId(), AcademicYear.AcademicYearStatus.ACTIVE);
        activePromotion.ifPresent(promotion -> {
            Trade trade = promotion.getTrade();
            dto.setTrade(trade);
            if (trade != null) {
                Sector sector = trade.getSector();
                dto.setSector(sector);
                if (sector != null) {
                    RTQFLevel level = sector.getRtqfLevel();
                    dto.setLevel(level);
                    trade.setSector(sector);
                    sector.setRtqfLevel(level);
                }
            }
        });
        return dto;
    }
}
