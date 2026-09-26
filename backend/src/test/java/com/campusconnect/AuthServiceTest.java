package com.campusconnect;

import com.campusconnect.dto.JwtAuthResponse;
import com.campusconnect.dto.RegisterRequest;
import com.campusconnect.entity.Role;
import com.campusconnect.entity.RoleName;
import com.campusconnect.entity.User;
import com.campusconnect.repository.*;
import com.campusconnect.security.JwtTokenProvider;
import com.campusconnect.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthServiceTest {

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private RecruiterRepository recruiterRepository;

    @Mock
    private CompanyRepository companyRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtTokenProvider tokenProvider;

    @InjectMocks
    private AuthService authService;

    private Role studentRole;

    @BeforeEach
    void setUp() {
        studentRole = Role.builder().id(1L).name(RoleName.ROLE_STUDENT).build();
    }

    @Test
    @DisplayName("Should successfully register a new student user")
    void testRegisterStudentSuccess() {
        RegisterRequest req = new RegisterRequest();
        req.setFullName("Test Student");
        req.setEmail("teststudent@campus.com");
        req.setPassword("password123");
        req.setRole("STUDENT");

        when(userRepository.existsByEmail("teststudent@campus.com")).thenReturn(false);
        when(roleRepository.findByName(RoleName.ROLE_STUDENT)).thenReturn(Optional.of(studentRole));
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");

        User savedUser = User.builder().id(50L).fullName("Test Student").email("teststudent@campus.com").role(studentRole).build();
        when(userRepository.save(any(User.class))).thenReturn(savedUser);

        // Mock student save — AuthService calls student.getId() after saving
        com.campusconnect.entity.Student savedStudent = com.campusconnect.entity.Student.builder()
                .id(10L).user(savedUser).build();
        when(studentRepository.save(any(com.campusconnect.entity.Student.class))).thenReturn(savedStudent);

        Authentication auth = mock(Authentication.class);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class))).thenReturn(auth);
        when(tokenProvider.generateToken(any())).thenReturn("mock-jwt-token");

        JwtAuthResponse resp = authService.register(req);

        assertNotNull(resp);
        assertEquals("mock-jwt-token", resp.getAccessToken());
        assertEquals("teststudent@campus.com", resp.getEmail());
        assertEquals("ROLE_STUDENT", resp.getRole());
        assertEquals(10L, resp.getStudentId());
    }
}
