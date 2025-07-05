package com.skillsync.controller;

import com.skillsync.dto.AuthRequest;
import com.skillsync.dto.AuthResponse;
import com.skillsync.model.User;
import com.skillsync.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            System.out.println("Register endpoint hit");
            String result = authService.register(user);
            return ResponseEntity.ok(result); // or use ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (RuntimeException e) {
            // Log the exception (you can replace with proper logging)
            System.err.println("Registration error: " + e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(e.getMessage()); // Example: "User already exists with this email"
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try {
            AuthResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // This might be invalid credentials
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(e.getMessage()); // Example: "Invalid email or password"
        }
    }
}
