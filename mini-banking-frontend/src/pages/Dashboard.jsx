"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { getTransactionHistory, getUserDetails } from "../api/bankingApi"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Loader } from "../components/Loader"
import TransactionTable from "../components/TransactionTable"
import { Wallet, TrendingUp, Clock } from "lucide-react"

export default function Dashboard() {
  const { user, token } = useAuth()
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }

    const fetchDashboardData = async () => {
      try {
        setLoading(true)
        const [detailsRes, historyRes] = await Promise.all([
          getUserDetails(),
          getTransactionHistory(0, 5), // Fetch last 5 transactions
        ])

        setUserDetails(detailsRes.data)
        setTransactions(historyRes.data.content || [])
        setError(null)
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError("Failed to load dashboard data")
        if (err.response?.status === 401) {
          navigate("/login")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [token, navigate])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount || 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Welcome back, {userDetails?.name || "User"}!</h1>
          <p className="text-slate-600">{userDetails?.email}</p>
        </div>

        {error && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <p className="text-red-600">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Balance Card */}
          <Card className="border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-blue-600" />
                Account Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{formatCurrency(userDetails?.balance)}</div>
              <p className="text-sm text-slate-500 mt-2">Total available funds</p>
            </CardContent>
          </Card>

          {/* Transactions Count */}
          <Card className="border-2 border-green-100 bg-gradient-to-br from-green-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                Total Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{userDetails?.totalTransactions || 0}</div>
              <p className="text-sm text-slate-500 mt-2">Lifetime activity</p>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-2 border-purple-100 bg-gradient-to-br from-purple-50 to-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-slate-700 flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{transactions.length}</div>
              <p className="text-sm text-slate-500 mt-2">Latest transactions shown</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Recent Transactions</CardTitle>
            <CardDescription>Your latest 5 transactions</CardDescription>
          </CardHeader>
          <CardContent>
            {transactions.length > 0 ? (
              <TransactionTable transactions={transactions} />
            ) : (
              <div className="py-12 text-center">
                <p className="text-slate-500 text-lg">No transactions yet</p>
                <p className="text-slate-400 text-sm">Start by making a deposit or transfer</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/deposit")}
              className="p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-400 hover:shadow-md transition-all text-center"
            >
              <div className="font-semibold text-blue-600">Deposit</div>
              <div className="text-sm text-slate-500">Add funds</div>
            </button>
            <button
              onClick={() => navigate("/withdraw")}
              className="p-4 bg-white rounded-lg border border-green-200 hover:border-green-400 hover:shadow-md transition-all text-center"
            >
              <div className="font-semibold text-green-600">Withdraw</div>
              <div className="text-sm text-slate-500">Cash out</div>
            </button>
            <button
              onClick={() => navigate("/transfer")}
              className="p-4 bg-white rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all text-center"
            >
              <div className="font-semibold text-purple-600">Transfer</div>
              <div className="text-sm text-slate-500">Send money</div>
            </button>
            <button
              onClick={() => navigate("/transactions")}
              className="p-4 bg-white rounded-lg border border-orange-200 hover:border-orange-400 hover:shadow-md transition-all text-center"
            >
              <div className="font-semibold text-orange-600">History</div>
              <div className="text-sm text-slate-500">View all</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
