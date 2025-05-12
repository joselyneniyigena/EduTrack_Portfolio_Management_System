package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.UserRole;

import java.util.List;
import java.util.Optional;

public interface UserRoleService {
    UserRole assignRole(UserRole userRole);
    void deleteUserRole(Long id);
    Optional<UserRole> getUserRoleById(Long id);
    List<UserRole> getAllUserRoles();
    List<UserRole> getRolesByUserId(Long userId);
    List<UserRole> getUsersByRoleId(Long roleId);
}
