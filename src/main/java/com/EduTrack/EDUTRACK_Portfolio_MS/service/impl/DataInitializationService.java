package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Role;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.User;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.UserRole;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.RoleRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.UserRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class DataInitializationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRoleRepository userRoleRepository;

    @Transactional
    public void initializeSuperAdmin(String superAdminUsername, String encryptedSuperAdminPassword) {
        userRepository.findByUsername(superAdminUsername).orElseGet(
                () -> createSuperAdmin(superAdminUsername, encryptedSuperAdminPassword));
    }

    private User createSuperAdmin(String username, String rawPassword) {
        User superAdmin = new User();
        superAdmin.setUsername(username);
        superAdmin.setPassword(passwordEncoder.encode(rawPassword));
        superAdmin.setEmail(username);
        superAdmin.setFirstName("Joselyne");
        superAdmin.setLastName("Niyigena");
        superAdmin.setPhoneNumber("+250788888888");
        superAdmin.setEnabled(true);

        Role superAdminRole = roleRepository
                .findByName(Role.RoleName.SUPER_ADMIN)
                .orElseGet(() -> {
                    Role role = new Role(Role.RoleName.SUPER_ADMIN);
                    return roleRepository.save(role);
                });
        User saveduser = userRepository.save(superAdmin);
        UserRole userRole = UserRole.builder()
                .user(saveduser)
                .role(superAdminRole)
                .build();
        userRoleRepository.save(userRole);
        return saveduser;
    }
}
