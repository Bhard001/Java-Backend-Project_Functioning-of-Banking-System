package com.bankingsystem.service;

import com.bankingsystem.model.User;
import com.bankingsystem.repository.UserRepository;
import com.bankingsystem.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    /**
     * Save a new user in the DB
     */
    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Get user by their unique ID
     */
    @Override
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Get all users from the DB
     */
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Delete a user ONLY IF they have no transactions
     */
    @Override
    public void deleteUser(Long id) {
        boolean hasTransactions = transactionRepository.existsByUserId(id);
        if (hasTransactions) {
            throw new IllegalStateException("Cannot delete user: they have transaction history.");
        }
        userRepository.deleteById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public Optional<User> getUserByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }

    @Override
    public List<User> searchUsersByEmail(String emailPart) {
        return userRepository.findByEmailContainingIgnoreCase(emailPart);
    }

    @Override
    public List<User> searchUsersByPhone(String phonePart) {
        return userRepository.findByPhoneContaining(phonePart);
    }



    /**
     * Update an existing user by ID with email uniqueness check
     */
    @Override
    @Transactional
    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id).map(existingUser -> {
            // Check if email is being updated
            if (!existingUser.getEmail().equals(updatedUser.getEmail())) {
                Optional<User> userWithEmail = userRepository.findByEmail(updatedUser.getEmail());
                if (userWithEmail.isPresent()) {
                    throw new RuntimeException("Email '" + updatedUser.getEmail() + "' is already in use by another user.");
                }
            }

            existingUser.setName(updatedUser.getName());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setPhone(updatedUser.getPhone());
            existingUser.setAddress(updatedUser.getAddress());
            existingUser.setBalance(updatedUser.getBalance());

            return userRepository.save(existingUser);
        }).orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }
}
