package com.EduTrack.EDUTRACK_Portfolio_MS.model;

import com.EduTrack.EDUTRACK_Portfolio_MS.enums.PromotionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TraineePromotion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "term_id")
    private Term term;

    @ManyToOne
    @JoinColumn(name = "trade_id")
    private Trade trade;

    @ManyToOne
    @JoinColumn(name = "trainee_id")
    private Trainee trainee;
    @Enumerated(EnumType.STRING)
    private PromotionStatus status;
    private LocalDate promotionDate;
}
