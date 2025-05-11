package com.EduTrack.EDUTRACK_Portfolio_MS.service;


import com.EduTrack.EDUTRACK_Portfolio_MS.dto.AppUserDTO;

import com.EduTrack.EDUTRACK_Portfolio_MS.dto.MapperUtil;
import com.EduTrack.EDUTRACK_Portfolio_MS.model.AppUser;
import com.EduTrack.EDUTRACK_Portfolio_MS.repository.AppUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final AppUserRepository userRepository;

    public List<AppUserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(MapperUtil::toDto)
                .collect(Collectors.toList());
    }

    public AppUserDTO getUserById(Long id) {
        return userRepository.findById(id)
                .map(MapperUtil::toDto)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public AppUserDTO createUser(AppUserDTO dto) {
        AppUser user = MapperUtil.toEntity(dto);
        return MapperUtil.toDto(userRepository.save(user));
    }

    @Transactional
    public AppUserDTO updateUser(Long id, AppUserDTO dto) {
        AppUser user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setEnabled(dto.isEnabled());
        user.setReferenceId(dto.getReferenceId());

        return MapperUtil.toDto(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }
}

