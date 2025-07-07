package com.EduTrack.EDUTRACK_Portfolio_MS.confg;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "app.config")
public class AppConfig {
    private String mailDriver;
    private String mailEncryption;
    private String mailUsername;
    private String mailSender;
    private boolean smtpAuth;
    private String smtpHost;
    private String smtpPassword;
    private int smtpPort;
}