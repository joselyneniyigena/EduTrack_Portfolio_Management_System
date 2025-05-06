package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Role;

import java.util.List;
import java.util.Optional;

public interface RoleService {
    Role save(Role role);
    Role findById(Long id);
    List<Role> findAll();
    Optional<Role> findByName(Role.RoleName name);
    Role update(Role role);
    void deleteById(Long id);

}
