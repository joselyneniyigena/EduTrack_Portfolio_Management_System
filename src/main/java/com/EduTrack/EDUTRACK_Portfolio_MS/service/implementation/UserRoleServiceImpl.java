package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Role;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.User;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.UserRole;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.UserRoleRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.UserRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserRoleServiceImpl implements UserRoleService {

    private final UserRoleRepository repository;
    @Override
    public UserRole save(UserRole userRole) {
        return repository.save(userRole);
    }

    @Override
    public Optional<UserRole> findByUserAndRole(User user, Role role) {
        return repository.findByUserAndRole(user, role);
    }

    @Override
    public List<UserRole> findAll() {
        return repository.findAll();
    }

    @Override
    public UserRole update(UserRole userRole) {
        return repository.save(userRole);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
