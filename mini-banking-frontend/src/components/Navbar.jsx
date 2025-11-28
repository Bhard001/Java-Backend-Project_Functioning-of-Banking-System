"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  if (!user) return null

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">💰</span>
            </div>
            <span className="font-bold text-lg text-gray-900">MiniBank</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/deposit">
              <Button variant="ghost" className="text-gray-700">
                Deposit
              </Button>
            </Link>
            <Link to="/withdraw">
              <Button variant="ghost" className="text-gray-700">
                Withdraw
              </Button>
            </Link>
            <Link to="/transfer">
              <Button variant="ghost" className="text-gray-700">
                Transfer
              </Button>
            </Link>
            <Link to="/transactions">
              <Button variant="ghost" className="text-gray-700">
                History
              </Button>
            </Link>
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-sm">
              <p className="text-gray-900 font-medium">{user?.name}</p>
              <p className="text-gray-500 text-xs">{user?.email}</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-200 bg-transparent">
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/deposit" className="block">
              <Button variant="ghost" className="w-full justify-start text-gray-700">
                Deposit
              </Button>
            </Link>
            <Link to="/withdraw" className="block">
              <Button variant="ghost" className="w-full justify-start text-gray-700">
                Withdraw
              </Button>
            </Link>
            <Link to="/transfer" className="block">
              <Button variant="ghost" className="w-full justify-start text-gray-700">
                Transfer
              </Button>
            </Link>
            <Link to="/transactions" className="block">
              <Button variant="ghost" className="w-full justify-start text-gray-700">
                History
              </Button>
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full text-red-600 border-red-200 mt-2 bg-transparent"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
