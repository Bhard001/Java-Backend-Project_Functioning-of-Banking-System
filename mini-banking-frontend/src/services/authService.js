// src/services/authService.js
// Centralized auth calls (login/register/profile).
// Assumes `src/services/api.js` exports an axios instance whose baseURL points to your backend API root (e.g. http://localhost:8080/api)

import api from './api';

const getTokenHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Login user
 * @param {string} email
 * @param {string} password
 * @returns {object} response data from backend (usually includes token)
 */
export async function login(email, password) {
  try {
    const res = await api.post('/auth/login', { email, password }, { headers: getTokenHeader() });
    return res.data;
  } catch (err) {
    // Normalize error
    throw err?.response?.data || new Error(err.message || 'Login failed');
  }
}

/**
 * Register user (adjust endpoint payload if your backend expects different fields)
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */
export async function register(name, email, password) {
  try {
    const res = await api.post('/auth/register', { name, email, password });
    return res.data;
  } catch (err) {
    throw err?.response?.data || new Error(err.message || 'Registration failed');
  }
}

/**
 * Fetch current user's profile (requires auth)
 */
export async function getProfile() {
  try {
    const res = await api.get('/auth/profile', { headers: getTokenHeader() });
    return res.data;
  } catch (err) {
    throw err?.response?.data || new Error(err.message || 'Fetch profile failed');
  }
}

export default {
  login,
  register,
  getProfile,
};
