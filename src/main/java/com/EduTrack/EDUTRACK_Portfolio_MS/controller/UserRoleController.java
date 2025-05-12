package com.EduTrack.EDUTRACK_Portfolio_MS.controller;

import com.EduTrack.EDUTRACK_Portfolio_MS.model.UserRole;
import com.EduTrack.EDUTRACK_Portfolio_MS.service.UserRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-roles")
@RequiredArgsConstructor

public class UserRoleController {
    private final UserRoleService userRoleService;

    @PostMapping
    public ResponseEntity<UserRole> assignRole(@RequestBody UserRole userRole) {
        return ResponseEntity.ok(userRoleService.assignRole(userRole));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userRoleService.deleteUserRole(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<UserRole>> getAll() {
        return ResponseEntity.ok(userRoleService.getAllUserRoles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserRole> getById(@PathVariable Long id) {
        return userRoleService.getUserRoleById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserRole>> getRolesByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userRoleService.getRolesByUserId(userId));
    }

    @GetMapping("/role/{roleId}")
    public ResponseEntity<List<UserRole>> getUsersByRole(@PathVariable Long roleId) {
        return ResponseEntity.ok(userRoleService.getUsersByRoleId(roleId));
    }
}
