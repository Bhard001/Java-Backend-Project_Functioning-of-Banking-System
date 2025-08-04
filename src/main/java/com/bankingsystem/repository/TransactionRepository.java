package com.bankingsystem.repository;

import com.bankingsystem.model.Transaction;
import com.bankingsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Page<Transaction> findByUserId(Long userId, Pageable pageable);
    // Fetch all transactions of a specific user
    List<Transaction> findByUser(User user);

    // Optional: Find top 5 latest transactions for a user
    List<Transaction> findTop5ByUserOrderByTimestampDesc(User user);

    boolean existsByUserId(Long userId);

}
