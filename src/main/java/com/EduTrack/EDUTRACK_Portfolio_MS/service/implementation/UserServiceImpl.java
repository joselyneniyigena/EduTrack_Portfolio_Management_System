package com.EduTrack.EDUTRACK_Portfolio_MS.service.implementation;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.User;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.UserRepository;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl  implements UserService{

    private final UserRepository repository;

    @Override
    public User save(User user) {
        return repository.save(user);
    }

    @Override
    public User findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<User> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return repository.findByUsername(username);
    }

    @Override
    public User update(User user) {
        return repository.save(user);
    }

    @Override
    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
