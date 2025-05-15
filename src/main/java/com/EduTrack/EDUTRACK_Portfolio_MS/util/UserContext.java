package com.EduTrack.EDUTRACK_Portfolio_MS.util;

import com.EduTrack.EDUTRACK_Portfolio_MS.confg.filters.JwtTokenUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.util.List;
import java.util.Objects;

public class UserContext {

    private static final ThreadLocal<Long> currentUserId = new ThreadLocal<>();
    private static final ThreadLocal<String> currentUsername = new ThreadLocal<>();
    private static final ThreadLocal<List<String>> currentUserRoles = new ThreadLocal<>();


    public static void setUserId(long userId) {
        currentUserId.set(userId);
    }

    public static void setCurrentUsername(String username) {
        currentUsername.set(username);
    }

    public static void setCurrentUserRoles(List<String> userRoles) {
        currentUserRoles.set(userRoles);
    }


    public static long getCurrentUserId() {
        Long userId = currentUserId.get();
        if (userId == null) {
            String token = getToken();
            if (token != null) {
                userId = getJwtTokenUtil().getUserIdFromToken(token);
                if (userId != null) {
                    setUserId(userId);
                }
            }
        }
        return userId;
    }

    public static String getCurrentUsername() {
        String username = currentUsername.get();
        if (username == null) {
            String token = getToken();
            if (token != null) {
                username = getJwtTokenUtil().getUsernameFromToken(token);
                if (username != null) {
                    setCurrentUsername(username);
                }
            }
        }
        return username;
    }

    public static List<String> getCurrentUserRoles() {
        List<String> roles = currentUserRoles.get();
        if (roles == null) {
            String token = getToken();
            if (token != null) {
                roles = getJwtTokenUtil().getUserRolesFromToken(token);
                if (roles != null && !roles.isEmpty()) {
                    setCurrentUserRoles(roles);
                }
            }
        }
        return roles;
    }

    public static void clear() {
        currentUserId.remove();
        currentUsername.remove();
        currentUserRoles.remove();
    }

    private static String getToken() {
        HttpServletRequest request = getCurrentRequest();
        if (request != null) {
            String bearer = request.getHeader("Authorization");
            if (bearer != null && bearer.startsWith("Bearer ")) {
                return bearer.substring(7);
            }
        }
        return null;
    }

    private static HttpServletRequest getCurrentRequest() {
        try {
            return ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        } catch (Exception e) {
            return null;
        }
    }

    private static JwtTokenUtil getJwtTokenUtil() {
        return ApplicationContextProvider.getBean(JwtTokenUtil.class);
    }
}
