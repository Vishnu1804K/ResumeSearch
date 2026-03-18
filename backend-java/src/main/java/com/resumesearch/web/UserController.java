package com.resumesearch.web;

import com.resumesearch.domain.User;
import com.resumesearch.repository.UserRepository;
import com.resumesearch.web.dto.LoginRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        return userRepository.findByUsername(request.getUsername())
                .map(user -> {
                    if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                        return ResponseEntity.ok(user);
                    }
                    return ResponseEntity.badRequest().body("Login failed");
                })
                .orElseGet(() -> ResponseEntity.badRequest().body("Login failed"));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User body) {
        if (body.getUsername() == null || body.getPassword() == null) {
            return ResponseEntity.badRequest().body("Registration failed");
        }

        if (userRepository.findByUsername(body.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Registration failed");
        }

        body.setPassword(passwordEncoder.encode(body.getPassword()));
        User saved = userRepository.save(body);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/update")
    public ResponseEntity<?> update(@RequestBody User body) {
        if (body.getId() == null) {
            return ResponseEntity.badRequest().body("Missing id");
        }
        return userRepository.findById(body.getId())
                .<ResponseEntity<?>>map(existing -> {
                    body.setPassword(existing.getPassword());
                    User updated = userRepository.save(body);
                    return ResponseEntity.ok(updated);
                })
                .orElseGet(() -> ResponseEntity.badRequest().body("User not found"));
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }
}

