import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api"

const api = axios.create({
  baseURL: API_BASE_URL,
})

// Add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle token expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)

export const loginUser = (data) => api.post("/auth/login", data)

export const getUserDetails = () => api.get("/users/me")

export const getTransactionHistory = (page = 0, size = 10, sort = "date,desc") =>
  api.get("/transactions/history", { params: { page, size, sort } })

export const transferMoney = (payload) => api.post("/transactions/transfer", payload)

export const creditMoney = (payload) => api.post("/transactions/credit", payload)

export const debitMoney = (payload) => api.post("/transactions/debit", payload)

export default api
