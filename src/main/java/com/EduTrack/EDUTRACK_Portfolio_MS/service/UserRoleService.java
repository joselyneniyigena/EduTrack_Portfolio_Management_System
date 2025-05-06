package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Role;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.User;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.UserRole;

import java.util.List;
import java.util.Optional;

public interface UserRoleService {
    UserRole save(UserRole userRole);
    Optional<UserRole> findByUserAndRole(User user, Role role);
    List<UserRole> findAll();
    UserRole update(UserRole userRole);
    void deleteById(Long id);
}
