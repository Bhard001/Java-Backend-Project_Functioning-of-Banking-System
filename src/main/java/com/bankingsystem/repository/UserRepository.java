package com.bankingsystem.repository;

import com.bankingsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Custom method to find user by email
    Optional<User> findByEmail(String email);
    Optional<User> findByPhone(String email);

    // Optional: if you want to support partial matches (for admin search UI)
    List<User> findByEmailContainingIgnoreCase(String email);
    List<User> findByPhoneContaining(String phone);

}
