package com.EduTrack.EDUTRACK_Portfolio_MS.confg;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
@AllArgsConstructor
public class MailSenderConfig {

    private final AppConfig appConfig;
    @Bean(name = "systemMailSender")
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(appConfig.getSmtpHost());
        mailSender.setPort(appConfig.getSmtpPort());
        mailSender.setUsername(appConfig.getMailUsername());
        mailSender.setPassword(appConfig.getSmtpPassword());

        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", appConfig.getMailDriver());
        props.put("mail.smtp.auth", appConfig.isSmtpAuth());
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");
        return mailSender;
    }
}