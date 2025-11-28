// src/services/transactionService.js
// Transaction-related API helpers.
// Uses the `api` axios instance (src/services/api.js).

import api from './api';

const getTokenHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Get paginated transactions for a user.
 * Calls: GET /api/transactions/{userId}?page=&size=&sortBy=&sortDir=
 */
export async function getTransactions(userId, { page = 0, size = 10, sortBy = 'transactionDate', sortDir = 'desc' } = {}) {
  try {
    const res = await api.get(`/transactions/${userId}`, {
      headers: getTokenHeader(),
      params: { page, size, sortBy, sortDir },
    });
    return res.data;
  } catch (err) {
    throw err?.response?.data || new Error(err.message || 'Fetch transactions failed');
  }
}

/**
 * Get non-paginated history array endpoint if your backend exposes /history/{userId}
 */
export async function getAllTransactions(userId) {
  try {
    const res = await api.get(`/transactions/history/${userId}`, { headers: getTokenHeader() });
    return res.data;
  } catch (err) {
    throw err?.response?.data || new Error(err.message || 'Fetch transaction history failed');
  }
}

/**
 * Get account balance
 * Calls: GET /api/transactions/balance/{userId}
 */
export async function getBalance(userId) {
  try {
    const res = await api.get(`/transactions/balance/${userId}`, { headers: getTokenHeader() });
    return res.data;
  } catch (err) {
    throw err?.response?.data || new Error(err.message || 'Fetch balance failed');
  }
}

/**
 * Credit account
 * Calls: POST /api/transactions/credit  with body { userId, amount }
 */
export async function credit(userId, amount) {
  try {
    const res = await api.post('/transactions/credit', { userId, amount }, { headers: getTokenHeader() });
    return res.data;
  } catch (err) {
    throw err?.response?.data || new Error(err.message || 'Credit failed');
  }
}

/**
 * Debit account
 * Calls: POST /api/transactions/debit  with body { userId, amount }
 */
export async function debit(userId, amount) {
  try {
    const res = await api.post('/transactions/debit', { userId, amount }, { headers: getTokenHeader() });
    return res.data;
  } catch (err) {
    throw err?.response?.data || new Error(err.message || 'Debit failed');
  }
}

/**
 * Transfer money
 * Calls: POST /api/transactions/transfer  with body { fromUserId, toUserId, amount }
 */
export async function transfer(fromUserId, toUserId, amount) {
  try {
    const res = await api.post('/transactions/transfer', { fromUserId, toUserId, amount }, { headers: getTokenHeader() });
    return res.data;
  } catch (err) {
    throw err?.response?.data || new Error(err.message || 'Transfer failed');
  }
}

export default {
  getTransactions,
  getAllTransactions,
  getBalance,
  credit,
  debit,
  transfer,
};
