package com.EduTrack.EDUTRACK_Portfolio_MS.dto;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.*;

public class MapperUtil {

    public static AppUserDTO toDto(AppUser user) {
        return AppUserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .registrationDate(user.getRegistrationDate())
                .email(user.getEmail())
                .enabled(user.isEnabled())
                .referenceId(user.getReferenceId())
                .build();
    }

    public static AppUser toEntity(AppUserDTO dto) {
        return AppUser.builder()
                .id(dto.getId())
                .username(dto.getUsername())
                .registrationDate(dto.getRegistrationDate())
                .email(dto.getEmail())
                .enabled(dto.isEnabled())
                .referenceId(dto.getReferenceId())
                .build();
    }

    public static TrainerDTO toDto(Trainer trainer) {
        return TrainerDTO.builder()
                .id(trainer.getId())
                .trainerId(trainer.getTrainerId())
                .firstName(trainer.getFirstName())
                .lastName(trainer.getLastName())
                .dob(trainer.getDob())
                .gender(trainer.getGender())
                .maritalStatus(trainer.getMaritalStatus())
                .email(trainer.getEmail())
                .phoneNbr(trainer.getPhoneNbr())
                .address(trainer.getAddress())
                .build();
    }

    public static Trainer toEntity(TrainerDTO dto) {
        return Trainer.builder()
                .id(dto.getId())
                .trainerId(dto.getTrainerId())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .dob(dto.getDob())
                .gender(dto.getGender())
                .maritalStatus(dto.getMaritalStatus())
                .email(dto.getEmail())
                .phoneNbr(dto.getPhoneNbr())
                .address(dto.getAddress())
                .build();
    }

    public static TraineeDTO toDto(Trainee trainee) {
        return TraineeDTO.builder()
                .id(trainee.getId())
                .traineeId(trainee.getTraineeId())
                .firstName(trainee.getFirstName())
                .lastName(trainee.getLastName())
                .dob(trainee.getDob())
                .gender(trainee.getGender())
                .maritalStatus(trainee.getMaritalStatus())
                .email(trainee.getEmail())
                .phoneNbr(trainee.getPhoneNbr())
                .address(trainee.getAddress())
                .build();
    }

    public static Trainee toEntity(TraineeDTO dto) {
        return Trainee.builder()
                .id(dto.getId())
                .traineeId(dto.getTraineeId())
                .firstName(dto.getFirstName())
                .lastName(dto.getLastName())
                .dob(dto.getDob())
                .gender(dto.getGender())
                .maritalStatus(dto.getMaritalStatus())
                .email(dto.getEmail())
                .phoneNbr(dto.getPhoneNbr())
                .address(dto.getAddress())
                .build();
    }

    public static SchoolProfileDTO toDto(SchoolProfile entity) {
        return SchoolProfileDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .logo(entity.getLogo())
                .phoneNbr(entity.getPhoneNbr())
                .email(entity.getEmail())
                .address(entity.getAddress())
                .description(entity.getDescription())
                .build();
    }

    public static SchoolProfile toEntity(SchoolProfileDTO dto) {
        return SchoolProfile.builder()
                .id(dto.getId())
                .name(dto.getName())
                .logo(dto.getLogo())
                .phoneNbr(dto.getPhoneNbr())
                .email(dto.getEmail())
                .address(dto.getAddress())
                .description(dto.getDescription())
                .build();
    }

    public static AssessmentDTO toDto(Assessment entity) {
        return AssessmentDTO.builder()
                .id(entity.getId())
                .type(entity.getType() != null ? entity.getType().name() : null)
                .dateTime(entity.getDateTime())
                .category(entity.getCategory() != null ? entity.getCategory().name() : null)
                .location(entity.getLocation() != null ? entity.getLocation().name() : null)
                .term(entity.getTerm())
                .trainerModuleId(entity.getTrainerModule() != null ? entity.getTrainerModule().getId() : null)
                .build();
    }

    public static Assessment toEntity(AssessmentDTO dto) {
        Assessment assessment = new Assessment();
        assessment.setId(dto.getId());
        assessment.setType(dto.getType() != null ? Assessment.AssessmentType.valueOf(dto.getType()) : null);
        assessment.setDateTime(dto.getDateTime());
        assessment.setCategory(dto.getCategory() != null ? Assessment.AssessmentCategory.valueOf(dto.getCategory()) : null);
        assessment.setLocation(dto.getLocation() != null ? Assessment.AssessmentLocation.valueOf(dto.getLocation()) : null);
        assessment.setTerm(dto.getTerm());
        return assessment;
    }

    public static LearningUnitDTO toDto(LearningUnit entity) {
        return LearningUnitDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .objective(entity.getObjective())
                .description(entity.getDescription())
                .learningOutcome(entity.getLearningOutcome())
                .moduleId(entity.getModule() != null ? entity.getModule().getId() : null)
                .build();
    }

    public static EvidenceDTO toDto(Evidence entity) {
        return EvidenceDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .type(entity.getType())
                .content(entity.getContent())
                .traineeAssessmentId(entity.getTraineeAssessment() != null ? entity.getTraineeAssessment().getId() : null)
                .build();
    }

    public static AcademicYearDTO toDto(AcademicYear entity) {
        return AcademicYearDTO.builder()
                .id(entity.getId())
                .year(entity.getYear())
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .status(entity.getStatus())
                .build();
    }

    public static TermDTO toDto(Term entity) {
        return TermDTO.builder()
                .id(entity.getId())
                .academicYearId(entity.getAcademicYear() != null ? entity.getAcademicYear().getId() : null)
                .startDate(entity.getStartDate())
                .endDate(entity.getEndDate())
                .status(entity.getStatus())
                .build();
    }
}

