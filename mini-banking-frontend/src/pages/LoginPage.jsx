"use client"
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useState } from "react"

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm()

  const { login } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data) => {
    try {
      const res = await login(data.email, data.password)
      toast.success("Logged in")
      navigate("/")
    } catch (error) {
      const msg = error?.message || error?.response?.data || "Login failed"
      toast.error("Login failed: " + (typeof msg === "string" ? msg : JSON.stringify(msg)))
    }
  }

  return (
    // ✅ CHANGED: Added flex-col to improve vertical alignment
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* ✅ CHANGED: Added flex and justify-center to keep card vertically centered */}
      <div className="w-full max-w-md relative z-10 flex flex-col justify-center">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-300 text-sm">Sign in to your account to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex flex-col items-center">
            {/* Email */}
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-3 text-center">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             transition duration-200 placeholder-gray-400 text-white text-center
                             hover:bg-white/20 backdrop-blur-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm mt-2 text-center font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="w-full">
              <label htmlFor="password" className="block text-sm font-semibold text-gray-200 mb-3 text-center">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: "Password is required" })}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 bg-white/10 border border-white/20 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             transition duration-200 placeholder-gray-400 text-white text-center
                             hover:bg-white/20 backdrop-blur-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-2 text-center font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
                         text-white py-3 px-4 rounded-lg font-semibold 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900
                         transform transition duration-200 shadow-lg"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center space-y-3">
            <a href="#" className="block text-sm text-gray-300 hover:text-white transition">
              Forgot your password?
            </a>
            <p className="text-sm text-gray-400">
              Don't have an account?{" "}
              <a href="/register" className="text-blue-400 hover:text-blue-300 font-semibold transition">
                Sign up here
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
