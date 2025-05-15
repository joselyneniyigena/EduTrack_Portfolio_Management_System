package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.User;

import java.util.List;
import java.util.Optional;

public interface AppUserService {
    User createUser(User user);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
    List<User> getAllUsers();
    Optional<User> getUserById(Long id);
    Optional<User> findByUsername(String username);
    void enableUser(Long id);
    void disableUser(Long id);
}
