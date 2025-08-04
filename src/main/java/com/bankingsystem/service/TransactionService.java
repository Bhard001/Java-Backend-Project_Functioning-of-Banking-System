package com.bankingsystem.service;

import com.bankingsystem.model.Transaction;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TransactionService {

    /**
     * Credits the specified amount to the user's account.
     *
     * @param userId ID of the user to credit
     * @param amount Amount to credit
     * @return Transaction record of the credit
     */
    Transaction credit(Long userId, double amount);

    /**
     * Debits the specified amount from the user's account.
     *
     * @param userId ID of the user to debit
     * @param amount Amount to debit
     * @return Transaction record of the debit
     */
    Transaction debit(Long userId, double amount);

    /**
     * Transfers amount from one user to another.
     *
     * @param fromUserId Sender user ID
     * @param toUserId Receiver user ID
     * @param amount Amount to transfer
     * @return Transaction record of the transfer
     */
    Transaction transfer(Long fromUserId, Long toUserId, double amount);

    /**
     * Retrieves the transaction history of a user.
     *
     * @param userId ID of the user
     * @return List of transactions
     */
    List<Transaction> getTransactionsByUser(Long userId);

    /**
     * Retrieves the current balance of a user.
     *
     * @param userId ID of the user
     * @return BigDecimal balance
     */
    BigDecimal getBalance(Long userId);

    Page<Transaction> getTransactionsByUser(Long userId, Pageable pageable);
}
