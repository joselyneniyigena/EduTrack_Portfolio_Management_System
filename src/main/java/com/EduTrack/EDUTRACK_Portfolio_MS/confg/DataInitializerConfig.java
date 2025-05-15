package com.EduTrack.EDUTRACK_Portfolio_MS.confg;


import com.EduTrack.EDUTRACK_Portfolio_MS.service.impl.DataInitializationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializerConfig {
    @Bean
    CommandLineRunner initSuperAdminUser(
            DataInitializationService dataInitializationService,
            @Value("${superadmin.username}") String superAdminUsername,
            @Value("${superadmin.password}") String encryptedSuperAdminPassword) {
        return args -> dataInitializationService.initializeSuperAdmin(superAdminUsername, encryptedSuperAdminPassword);
    }
}
