package com.EduTrack.EDUTRACK_Portfolio_MS.service.impl;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Role;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.User;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.UserRole;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.RoleRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.UserRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.UserRoleRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.UserRoleService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserRoleServiceImpl implements UserRoleService {


    private final UserRoleRepository userRoleRepository;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    @Override
    public UserRole assignRole(UserRole userRole) {
        if (userRoleRepository.existsByUserAndRole(userRole.getUser(), userRole.getRole())) {
            throw new IllegalStateException("User already has this role assigned");
        }
        return userRoleRepository.save(userRole);
    }

    @Override
    public void deleteUserRole(Long id) {
        userRoleRepository.deleteById(id);
    }

    @Override
    public Optional<UserRole> getUserRoleById(Long id) {
        return userRoleRepository.findById(id);
    }

    @Override
    public List<UserRole> getAllUserRoles() {
        return userRoleRepository.findAll();
    }

    @Override
    public List<UserRole> getRolesByUserId(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        return userRoleRepository.findByUser(user);
    }

    @Override
    public List<UserRole> getUsersByRoleId(Long roleId) {
        Role role = roleRepository.findById(roleId)
                .orElseThrow(() -> new EntityNotFoundException("Role not found"));
        return userRoleRepository.findByRole(role);
    }
}
