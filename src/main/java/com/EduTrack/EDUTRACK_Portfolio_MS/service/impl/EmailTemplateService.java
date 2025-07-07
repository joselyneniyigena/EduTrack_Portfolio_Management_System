package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.dto.EmailTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class EmailTemplateService {
    
    private static final Map<String, EmailTemplate> EMAIL_TEMPLATES = Map.of(
        "ADMISSION_WELCOME", new EmailTemplate(
            "Welcome to EduTrack! Your Admission & Account Details",
            """
            Dear {traineeName},
            
            We are delighted to inform you that you have been successfully admitted to EduTrack!
            
            Your journey with us is about to begin, and we are thrilled to have you join our community of learners.
            
            To get started, your personal EduTrack account has been created with the following temporary credentials:
            
              •  Username: {username}
              •  Temporary Password: {password}
            
            For your security, we strongly recommend that you log in to your account at your earliest convenience and change your temporary password to a strong, memorable one.
            
            We look forward to supporting your educational growth and success at EduTrack.
            
            Should you have any questions, please do not hesitate to contact our support team.
            
            Welcome aboard!
            
            Best regards,
            The EduTrack Team
            """
        ),
        
        "PASSWORD_RESET", new EmailTemplate(
            "EduTrack - Password Reset Request",
            """
            Dear {traineeName},
            
            We received a request to reset your EduTrack account password.
            
            Your temporary password is: {password}
            
            Please log in using this temporary password and change it immediately for security purposes.
            
            If you did not request this password reset, please contact our support team immediately.
            
            Best regards,
            The EduTrack Team
            """
        ),
        
        "ACCOUNT_ACTIVATION", new EmailTemplate(
            "EduTrack - Account Activation Required",
            """
            Dear {traineeName},
            
            Your EduTrack account has been created successfully!
            
            To complete your registration, please use the following credentials to log in:
            
              •  Username: {username}
              •  Temporary Password: {password}
            
            Please activate your account within 48 hours and set a permanent password.
            
            Best regards,
            The EduTrack Team
            """
        )
    );
    
    public EmailTemplate getTemplate(String templateName) {
        EmailTemplate template = EMAIL_TEMPLATES.get(templateName);
        if (template == null) {
            throw new IllegalArgumentException("Email template not found: " + templateName);
        }
        return template;
    }
    
    public String processTemplate(String templateName, Map<String, String> variables) {
        EmailTemplate template = getTemplate(templateName);
        String content = template.getTemplate();
        
        // Replace placeholders with actual values
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            String placeholder = "{" + entry.getKey() + "}";
            content = content.replace(placeholder, entry.getValue());
        }
        
        return content;
    }
}