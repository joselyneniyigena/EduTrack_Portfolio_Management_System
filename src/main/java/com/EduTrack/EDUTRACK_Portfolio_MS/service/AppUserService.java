package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.AppUser;

import java.util.List;
import java.util.Optional;

public interface AppUserService {
    AppUser createUser(AppUser user);
    AppUser updateUser(Long id, AppUser user);
    void deleteUser(Long id);
    List<AppUser> getAllUsers();
    Optional<AppUser> getUserById(Long id);
    Optional<AppUser> findByUsername(String username);
    void enableUser(Long id);
    void disableUser(Long id);
}
