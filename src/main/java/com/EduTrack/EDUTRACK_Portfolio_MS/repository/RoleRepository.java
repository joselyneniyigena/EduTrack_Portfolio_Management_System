package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(Role.RoleName name);
}
