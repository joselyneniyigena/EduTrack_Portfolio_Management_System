package com.EduTrack.EDUTRACK_Portfolio_MS.repository;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Role;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.User;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
    List<UserRole> findByUser(User user);
    List<UserRole> findByRole(Role role);
    Optional<UserRole> findByUserAndRole(User user, Role role);
    boolean existsByUserAndRole(User user, Role role);
}
