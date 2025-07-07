package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.dto.EmailTemplate;
import com.EduTrack.EDUTRACK_Portfolio_MS.exception.EmailSendException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
public class EmailService {


    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailTemplateService templateService;

    /**
     * Generic method to send emails using templates
     */
    public void sendTemplatedEmail(String to, String templateName, Map<String, String> variables) {
        try {
            validateEmailAddress(to);

            EmailTemplate template = templateService.getTemplate(templateName);
            String emailBody = templateService.processTemplate(templateName, variables);

            SimpleMailMessage message = createEmailMessage(to, template.getSubject(), emailBody);
            mailSender.send(message);

            log.info("Email sent successfully to: {} using template: {}", to, templateName);

        } catch (Exception e) {
            log.error("Failed to send email to: {} using template: {}", to, templateName, e);
            throw new EmailSendException("Failed to send email", e);
        }
    }

    /**
     * Specific method for admission emails - maintains backward compatibility
     */
    public void sendAdmissionEmail(String to, String traineeName, String username, String password) {
        Map<String, String> variables = Map.of(
                "traineeName", traineeName,
                "username", username,
                "password", password
        );

        sendTemplatedEmail(to, "ADMISSION_WELCOME", variables);
    }

    /**
     * Method for password reset emails
     */
    public void sendPasswordResetEmail(String to, String traineeName, String tempPassword) {
        Map<String, String> variables = Map.of(
                "traineeName", traineeName,
                "password", tempPassword
        );

        sendTemplatedEmail(to, "PASSWORD_RESET", variables);
    }

    /**
     * Method for account activation emails
     */
    public void sendAccountActivationEmail(String to, String traineeName, String username, String tempPassword) {
        Map<String, String> variables = Map.of(
                "traineeName", traineeName,
                "username", username,
                "password", tempPassword
        );

        sendTemplatedEmail(to, "ACCOUNT_ACTIVATION", variables);
    }

    // Helper methods for better code organization
    private SimpleMailMessage createEmailMessage(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        return message;
    }

    private void validateEmailAddress(String email) {
        if (email == null || email.trim().isEmpty()) {
            throw new IllegalArgumentException("Email address cannot be null or empty");
        }

        if (!email.contains("@")) {
            throw new IllegalArgumentException("Invalid email address format");
        }
    }
}