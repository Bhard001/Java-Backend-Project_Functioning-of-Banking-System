package com.bankingsystem.controller;

import com.bankingsystem.model.Transaction;
import com.bankingsystem.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions") // Base path for all transaction APIs
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    /**
     * Credit money to a user's account
     * Endpoint: POST /api/transactions/credit
     */
    @PostMapping("/credit")
    public ResponseEntity<Transaction> credit(@RequestBody Map<String, Object> request) {
        Long userId = Long.parseLong(request.get("userId").toString());
        double amount = Double.parseDouble(request.get("amount").toString());
        Transaction txn = transactionService.credit(userId, amount);
        return ResponseEntity.ok(txn);
    }

    /**
     * Debit money from a user's account
     * Endpoint: POST /api/transactions/debit
     */
    @PostMapping("/debit")
    public ResponseEntity<Transaction> debit(@RequestBody Map<String, Object> request) {
        Long userId = Long.parseLong(request.get("userId").toString());
        double amount = Double.parseDouble(request.get("amount").toString());
        Transaction txn = transactionService.debit(userId, amount);
        return ResponseEntity.ok(txn);
    }

    /**
     * Transfer money from one user to another
     * Endpoint: POST /api/transactions/transfer
     */
    @PostMapping("/transfer")
    public ResponseEntity<Transaction> transfer(@RequestBody Map<String, Object> request) {
        Long fromUserId = Long.parseLong(request.get("fromUserId").toString());
        Long toUserId = Long.parseLong(request.get("toUserId").toString());
        double amount = Double.parseDouble(request.get("amount").toString());
        Transaction txn = transactionService.transfer(fromUserId, toUserId, amount);
        return ResponseEntity.ok(txn);
    }

    /**
     * Get all transactions performed by a user
     * Endpoint: GET /api/transactions/history/{userId}
     */
    @GetMapping("/history/{userId}")
    public ResponseEntity<List<Transaction>> getUserTransactions(@PathVariable Long userId) {
        List<Transaction> transactions = transactionService.getTransactionsByUser(userId);
        return ResponseEntity.ok(transactions);
    }

    /**
     * Get current account balance of a user
     * Endpoint: GET /api/transactions/balance/{userId}
     */
    @GetMapping("/balance/{userId}")
    public ResponseEntity<BigDecimal> getBalance(@PathVariable Long userId) {
        BigDecimal balance = transactionService.getBalance(userId);
        return ResponseEntity.ok(balance);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Page<Transaction>> getUserTransactions(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size,
            @RequestParam(defaultValue = "timestamp") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {

        Pageable pageable = PageRequest.of(page, size,
                Sort.by(Sort.Direction.fromString(sortDir.toUpperCase()), sortBy));

        Page<Transaction> pageTransactions = transactionService.getTransactionsByUser(userId, pageable);
        return ResponseEntity.ok(pageTransactions);
    }

}
