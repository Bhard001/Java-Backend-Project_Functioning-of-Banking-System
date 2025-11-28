"use client"

import { Link, useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { LayoutDashboard, ArrowDownUp, Send, History, LogOut } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

export default function Sidebar() {
  const location = useLocation()
  const { logout } = useAuth()
  const navigate = useNavigate()

  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/deposit", label: "Deposit", icon: ArrowDownUp },
    { path: "/withdraw", label: "Withdraw", icon: ArrowDownUp },
    { path: "/transfer", label: "Transfer", icon: Send },
    { path: "/transactions", label: "History", icon: History },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <aside className="hidden md:flex w-64 bg-gray-900 text-white flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">MiniBank</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(({ path, label, icon: Icon }) => (
          <Link key={path} to={path}>
            <Button
              variant={isActive(path) ? "default" : "ghost"}
              className={`w-full justify-start gap-3 ${
                isActive(path) ? "bg-blue-600 text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{label}</span>
            </Button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-red-400 hover:text-red-300"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  )
}
