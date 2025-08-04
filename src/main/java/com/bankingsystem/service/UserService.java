package com.bankingsystem.service;

import com.bankingsystem.model.User;
import com.bankingsystem.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;



public interface UserService {
    User createUser(User user);
    Optional<User> getUserById(Long id);
    List<User> getAllUsers();

    void deleteUser(Long id);
    User updateUser(Long id, User updateUser);

    Optional<User> getUserByEmail(String email);
    Optional<User> getUserByPhone(String phone);
    List<User> searchUsersByEmail(String emailPart);
    List<User> searchUsersByPhone(String phonePart);



}
