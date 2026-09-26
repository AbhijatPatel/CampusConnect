package com.campusconnect.service;

import com.campusconnect.dto.JwtAuthResponse;
import com.campusconnect.dto.LoginRequest;
import com.campusconnect.dto.RegisterRequest;
import com.campusconnect.entity.*;
import com.campusconnect.exception.BadRequestException;
import com.campusconnect.repository.*;
import com.campusconnect.security.JwtTokenProvider;
import com.campusconnect.security.UserPrincipal;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StudentRepository studentRepository;
    private final RecruiterRepository recruiterRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider tokenProvider;

    public AuthService(AuthenticationManager authenticationManager, UserRepository userRepository, RoleRepository roleRepository, StudentRepository studentRepository, RecruiterRepository recruiterRepository, CompanyRepository companyRepository, PasswordEncoder passwordEncoder, JwtTokenProvider tokenProvider) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.studentRepository = studentRepository;
        this.recruiterRepository = recruiterRepository;
        this.companyRepository = companyRepository;
        this.passwordEncoder = passwordEncoder;
        this.tokenProvider = tokenProvider;
    }


    @Transactional
    public JwtAuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered: " + request.getEmail());
        }

        String roleStr = request.getRole().toUpperCase();
        if (!roleStr.startsWith("ROLE_")) {
            roleStr = "ROLE_" + roleStr;
        }

        RoleName roleName;
        try {
            roleName = RoleName.valueOf(roleStr);
        } catch (IllegalArgumentException e) {
            throw new BadRequestException("Invalid role specified: " + request.getRole());
        }

        Role role = roleRepository.findByName(roleName)
                .orElseGet(() -> roleRepository.save(Role.builder().name(roleName).build()));

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(role)
                .active(true)
                .build();

        user = userRepository.save(user);

        Long studentId = null;
        Long recruiterId = null;

        if (roleName == RoleName.ROLE_STUDENT) {
            Student student = Student.builder()
                    .user(user)
                    .bio("CampusConnect Student Profile")
                    .profileCompleteness(50)
                    .build();
            student = studentRepository.save(student);
            studentId = student.getId();
        } else if (roleName == RoleName.ROLE_RECRUITER) {
            String companyName = request.getCompanyName() != null ? request.getCompanyName() : "Tech Enterprise";
            Company company = companyRepository.findByName(companyName)
                    .orElseGet(() -> companyRepository.save(Company.builder()
                            .name(companyName)
                            .description("Leading Technology Partner")
                            .location("Global")
                            .build()));

            Recruiter recruiter = Recruiter.builder()
                    .user(user)
                    .company(company)
                    .designation(request.getDesignation() != null ? request.getDesignation() : "Talent Acquisition Lead")
                    .build();
            recruiter = recruiterRepository.save(recruiter);
            recruiterId = recruiter.getId();
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        return JwtAuthResponse.builder()
                .accessToken(jwt)
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(role.getName().name())
                .studentId(studentId)
                .recruiterId(recruiterId)
                .build();
    }

    public JwtAuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = tokenProvider.generateToken(authentication);

        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new BadRequestException("User not found"));

        Long studentId = studentRepository.findByUserId(user.getId()).map(Student::getId).orElse(null);
        Long recruiterId = recruiterRepository.findByUserId(user.getId()).map(Recruiter::getId).orElse(null);

        return JwtAuthResponse.builder()
                .accessToken(jwt)
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .role(user.getRole().getName().name())
                .studentId(studentId)
                .recruiterId(recruiterId)
                .build();
    }
}
