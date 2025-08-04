package com.bankingsystem.service.impl;

import com.bankingsystem.model.Transaction;
import com.bankingsystem.model.TransactionType;
import com.bankingsystem.model.User;
import com.bankingsystem.repository.TransactionRepository;
import com.bankingsystem.repository.UserRepository;
import com.bankingsystem.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class TransactionServiceImpl implements TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * Credit a user's account
     */
    @Override
    public Transaction credit(Long userId, double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }

        User user = getUser(userId);
        BigDecimal updatedBalance = user.getBalance().add(BigDecimal.valueOf(amount));
        user.setBalance(updatedBalance);

        Transaction txn = new Transaction();
        txn.setUser(user);
        txn.setType(TransactionType.CREDIT);
        txn.setAmount(BigDecimal.valueOf(amount));
        txn.setTimestamp(LocalDateTime.now());

        userRepository.save(user);
        return transactionRepository.save(txn);
    }

    /**
     * Debit a user's account
     */
    @Override
    public Transaction debit(Long userId, double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }

        User user = getUser(userId);
        BigDecimal currentBalance = user.getBalance();

        if (currentBalance.compareTo(BigDecimal.valueOf(amount)) < 0) {
            throw new RuntimeException("Insufficient balance");
        }

        user.setBalance(currentBalance.subtract(BigDecimal.valueOf(amount)));

        Transaction txn = new Transaction();
        txn.setUser(user);
        txn.setType(TransactionType.DEBIT);
        txn.setAmount(BigDecimal.valueOf(amount));
        txn.setTimestamp(LocalDateTime.now());

        userRepository.save(user);
        return transactionRepository.save(txn);
    }

    /**
     * Transfer amount from one user to another.
     * Ensures atomicity: both debit and credit happen together or rollback.
     */
    @Override
    @Transactional
    public Transaction transfer(Long fromUserId, Long toUserId, double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }

        if (fromUserId.equals(toUserId)) {
            throw new IllegalArgumentException("Cannot transfer to the same account");
        }

        // Step 1: Get both users
        User fromUser = getUser(fromUserId);
        User toUser = getUser(toUserId);

        // Step 2: Check balance of sender
        if (fromUser.getBalance().compareTo(BigDecimal.valueOf(amount)) < 0) {
            throw new RuntimeException("Insufficient balance to transfer");
        }

        // Step 3: Update balances
        fromUser.setBalance(fromUser.getBalance().subtract(BigDecimal.valueOf(amount)));
        toUser.setBalance(toUser.getBalance().add(BigDecimal.valueOf(amount)));

        // Step 4: Save updated users
        userRepository.save(fromUser);
        userRepository.save(toUser);

        // Step 5: Create transfer transaction (logged for sender)
        Transaction txn = new Transaction();
        txn.setUser(fromUser);
        txn.setType(TransactionType.TRANSFER);
        txn.setAmount(BigDecimal.valueOf(amount));
        txn.setTimestamp(LocalDateTime.now());
        txn.setDescription("Transferred ₹" + amount + " to user ID " + toUserId);

        return transactionRepository.save(txn);
    }

    /**
     * Get list of all transactions by a user
     */
    @Override
    public List<Transaction> getTransactionsByUser(Long userId) {
        User user = getUser(userId);
        return transactionRepository.findByUser(user);
    }

    /**
     * Get current balance of a user
     */
    @Override
    public BigDecimal getBalance(Long userId) {
        User user = getUser(userId);
        return user.getBalance();
    }

    /**
     * Helper method to fetch user or throw exception if not found
     */
    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    @Override
    public Page<Transaction> getTransactionsByUser(Long userId, Pageable pageable) {
        return transactionRepository.findByUserId(userId, pageable);
    }
}
