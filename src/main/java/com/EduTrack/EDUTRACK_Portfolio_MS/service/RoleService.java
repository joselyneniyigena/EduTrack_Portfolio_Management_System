package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    Role createRole(Role role);
    Optional<Role> getRoleById(Long id);
    Optional<Role> getRoleByName(Role.RoleName roleName);
    List<Role> getAllRoles();
    void deleteRole(Long id);
}
