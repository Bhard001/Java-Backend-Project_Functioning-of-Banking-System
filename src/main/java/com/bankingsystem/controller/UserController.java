package com.bankingsystem.controller;

import com.bankingsystem.model.User;
import com.bankingsystem.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users") // Base path for all user-related APIs
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Health check endpoint to verify controller is working
     */
    @GetMapping("/ping")
    public String ping() {
        return "Controller working!";
    }

    /**
     * API to create a new user
     */
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.createUser(user);
        return ResponseEntity.ok(savedUser);
    }

    /**
     * API to fetch a user by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * API to get all users
     */
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        User user = userService.updateUser(id, updatedUser);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }


    @GetMapping("/search/email")
    public ResponseEntity<?> searchUserByEmail(@RequestParam String email) {
        Optional<User> user = userService.getUserByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found with email: " + email);
        }
    }



    @GetMapping("/search/phone")
    public ResponseEntity<?> searchUserByPhone(@RequestParam String phone) {
        Optional<User> user = userService.getUserByPhone(phone);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found with phone: " + phone);
        }
    }



    // For admin UI — partial match support
    @GetMapping("/search/email/like")
    public ResponseEntity<List<User>> searchUsersByEmail(@RequestParam String emailPart) {
        return ResponseEntity.ok(userService.searchUsersByEmail(emailPart));
    }

    @GetMapping("/search/phone/like")
    public ResponseEntity<List<User>> searchUsersByPhone(@RequestParam String phonePart) {
        return ResponseEntity.ok(userService.searchUsersByPhone(phonePart));
    }


}
