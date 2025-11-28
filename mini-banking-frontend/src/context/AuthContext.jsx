"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { loginUser } from "../api/bankingApi"

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token")
    if (savedToken) {
      setToken(savedToken)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const { data } = await loginUser({ email, password })
      localStorage.setItem("token", data.token)
      setToken(data.token)
      setUser(data.user)
      return data
    } catch (error) {
      throw error.response?.data?.message || "Login failed"
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, token, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
