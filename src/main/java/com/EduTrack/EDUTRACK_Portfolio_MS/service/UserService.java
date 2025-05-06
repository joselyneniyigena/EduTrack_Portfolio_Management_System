package com.EduTrack.EDUTRACK_Portfolio_MS.service;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User save(User user);
    User findById(Long id);
    List<User> findAll();
    Optional<User> findByUsername(String username);
    User update(User user);
    void deleteById(Long id);
}
