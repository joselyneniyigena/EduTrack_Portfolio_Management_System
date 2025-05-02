package com.EduTrack.EDUTRACK_Portfolio_MS.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TradeModule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "module_course_id")
    private ModuleCourse moduleCourse;

    @ManyToOne
    @JoinColumn(name = "trade_id")
    private Trade trade;
}
