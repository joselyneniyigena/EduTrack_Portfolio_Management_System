package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.Role;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.RoleRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository repository;

    @Override
    public Role save(Role role) {
        return repository.save(role);
    }

    @Override
    public Role findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Role> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Role> findByName(Role.RoleName name) {
        return repository.findByName(name);
    }

    @Override
    public Role update(Role role) {
        return repository.save(role);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
