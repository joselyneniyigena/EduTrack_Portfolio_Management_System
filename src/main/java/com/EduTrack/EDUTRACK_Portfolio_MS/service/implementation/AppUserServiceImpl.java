package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.AppUser;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.AppUserRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.AppUserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AppUserServiceImpl implements AppUserService {

    private final AppUserRepository appUserRepository;
    @Override
    public AppUser createUser(AppUser user) {
        user.setRegistrationDate(LocalDateTime.now());
        return appUserRepository.save(user);
    }

    @Override
    public AppUser updateUser(Long id, AppUser updatedUser) {
        AppUser existing = appUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + id));

        existing.setUsername(updatedUser.getUsername());
        existing.setEmail(updatedUser.getEmail());
        existing.setPassword(updatedUser.getPassword()); // Consider hashing
        existing.setEnabled(updatedUser.isEnabled());
        existing.setUserReference(updatedUser.getUserReference()); // Updated line

        return appUserRepository.save(existing);
    }

    @Override
    public void deleteUser(Long id) {
        appUserRepository.deleteById(id);
    }

    @Override
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }

    @Override
    public Optional<AppUser> getUserById(Long id) {
        return appUserRepository.findById(id);
    }

    @Override
    public Optional<AppUser> findByUsername(String username) {
        return appUserRepository.findByUsername(username);
    }

    @Override
    public void enableUser(Long id) {
        AppUser user = appUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        user.setEnabled(true);
        appUserRepository.save(user);
    }

    @Override
    public void disableUser(Long id) {
        AppUser user = appUserRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
        user.setEnabled(false);
        appUserRepository.save(user);
    }
}
